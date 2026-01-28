'use client';

interface MarkdownRendererProps {
  content: string;
}

interface ListItem {
  content: string;
  subItems: string[];
}

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  // Split content by lines to process block-level elements
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: ListItem[] = [];
  let inList = false;

  const processInlineMarkdown = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    let currentIndex = 0;
    let keyCounter = 0;

    // Process all inline markdown patterns (code first, then bold, to avoid conflicts)
    const patterns: Array<{ regex: RegExp; render: (match: string, content: string) => React.ReactNode }> = [
      {
        regex: /`([^`]+)`/g,
        render: (_, content) => (
          <code key={`code-${keyCounter++}`} style={{
            backgroundColor: 'var(--chatbot-code-bg)',
            padding: '2px 6px',
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '0.9em',
            color: 'inherit',
          }}>
            {content}
          </code>
        )
      },
      {
        regex: /\*\*(.+?)\*\*/g,
        render: (_, content) => <strong key={`bold-${keyCounter++}`}>{content}</strong>
      }
    ];

    // Find all matches and sort by position
    const allMatches: Array<{ index: number; length: number; render: () => React.ReactNode }> = [];

    patterns.forEach(({ regex, render }) => {
      regex.lastIndex = 0; // Reset regex
      let match: RegExpExecArray | null;
      while ((match = regex.exec(text)) !== null) {
        // Capture match values to avoid null reference in closure
        const matchText = match[0];
        const matchContent = match[1];
        const matchIndex = match.index;
        
        allMatches.push({
          index: matchIndex,
          length: matchText.length,
          render: () => render(matchText, matchContent)
        });
      }
    });

    // Sort matches by position
    allMatches.sort((a, b) => a.index - b.index);

    // Remove overlapping matches (keep the first one)
    const nonOverlappingMatches: typeof allMatches = [];
    for (let i = 0; i < allMatches.length; i++) {
      const match = allMatches[i];
      const overlaps = nonOverlappingMatches.some(
        existing =>
          (match.index >= existing.index && match.index < existing.index + existing.length) ||
          (existing.index >= match.index && existing.index < match.index + match.length)
      );
      if (!overlaps) {
        nonOverlappingMatches.push(match);
      }
    }

    // Build parts array
    nonOverlappingMatches.forEach((match) => {
      // Add text before the match
      if (match.index > currentIndex) {
        const beforeText = text.substring(currentIndex, match.index);
        if (beforeText) {
          parts.push(beforeText);
        }
      }
      // Add the matched element
      parts.push(match.render());
      currentIndex = match.index + match.length;
    });

    // Add remaining text
    if (currentIndex < text.length) {
      const remainingText = text.substring(currentIndex);
      if (remainingText) {
        parts.push(remainingText);
      }
    }

    return parts.length > 0 ? parts : [text];
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    // Check if it's a heading (e.g., "# Title", "## Subtitle")
    const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/);

    // Check if it's a numbered list item (e.g., "1. **text**")
    const listMatch = trimmedLine.match(/^(\d+)\.\s+(.+)$/);
    // Check if it's a sub-item (e.g., "- Avez-vous...")
    const subItemMatch = trimmedLine.match(/^-\s+(.+)$/);

    if (headingMatch) {
      // If we were in a list, close it first
      if (inList) {
        elements.push(
          <ol key={`list-${index}`} style={{
            margin: '8px 0',
            paddingLeft: '24px',
            color: 'inherit',
          }}>
            {currentList.map((item, itemIndex) => (
              <li key={itemIndex} style={{
                marginBottom: '8px',
                lineHeight: '1.6',
                color: 'inherit',
              }}>
                <div>{processInlineMarkdown(item.content)}</div>
                {item.subItems.length > 0 && (
                  <ul style={{
                    marginTop: '6px',
                    marginBottom: '4px',
                    paddingLeft: '24px',
                    listStyleType: 'disc',
                    color: 'inherit',
                  }}>
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex} style={{
                        marginBottom: '4px',
                        lineHeight: '1.5',
                        color: 'inherit',
                      }}>
                        {processInlineMarkdown(subItem)}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        );
        currentList = [];
        inList = false;
      }

      const level = headingMatch[1].length;
      const headingText = headingMatch[2];
      const headingLevel = Math.min(level, 6) as 1 | 2 | 3 | 4 | 5 | 6;
      const fontSize = level === 1 ? '1.5em' : level === 2 ? '1.3em' : level === 3 ? '1.1em' : '1em';
      const marginTop = level === 1 ? '16px' : level === 2 ? '14px' : '12px';
      
      const headingProps = {
        key: `heading-${index}`,
        style: {
          marginTop,
          marginBottom: '8px',
          fontSize,
          fontWeight: '600' as const,
          lineHeight: '1.4',
          color: 'inherit',
        },
        children: processInlineMarkdown(headingText),
      };

      switch (headingLevel) {
        case 1:
          elements.push(<h1 {...headingProps} />);
          break;
        case 2:
          elements.push(<h2 {...headingProps} />);
          break;
        case 3:
          elements.push(<h3 {...headingProps} />);
          break;
        case 4:
          elements.push(<h4 {...headingProps} />);
          break;
        case 5:
          elements.push(<h5 {...headingProps} />);
          break;
        case 6:
          elements.push(<h6 {...headingProps} />);
          break;
      }
    } else if (listMatch) {
      if (!inList) {
        inList = true;
        currentList = [];
      }
      currentList.push({ content: listMatch[2], subItems: [] });
    } else if (subItemMatch && inList && currentList.length > 0) {
      // Add as sub-item to the last list item
      currentList[currentList.length - 1].subItems.push(subItemMatch[1]);
    } else {
      // Check if next line is a list item
      const nextLine = index < lines.length - 1 ? lines[index + 1].trim() : '';
      const nextIsList = nextLine.match(/^(\d+)\.\s+(.+)$/);
      
      // If we were in a list, close it if:
      // 1. We have real content (paragraphe) AND next line is not a list item
      // Empty lines are ignored to keep list items together
      if (inList && trimmedLine && !nextIsList) {
        elements.push(
          <ol key={`list-${index}`} style={{
            margin: '8px 0',
            paddingLeft: '24px',
            color: 'inherit',
          }}>
            {currentList.map((item, itemIndex) => (
              <li key={itemIndex} style={{
                marginBottom: '8px',
                lineHeight: '1.6',
                color: 'inherit',
              }}>
                <div>{processInlineMarkdown(item.content)}</div>
                {item.subItems.length > 0 && (
                  <ul style={{
                    marginTop: '6px',
                    marginBottom: '4px',
                    paddingLeft: '24px',
                    listStyleType: 'disc',
                    color: 'inherit',
                  }}>
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex} style={{
                        marginBottom: '4px',
                        lineHeight: '1.5',
                        color: 'inherit',
                      }}>
                        {processInlineMarkdown(subItem)}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        );
        currentList = [];
        inList = false;
      }

      // Process regular lines (only if not empty)
      // Empty lines within a list are ignored to keep list items together
      if (trimmedLine) {
        elements.push(
          <p key={`line-${index}`} style={{
            margin: '8px 0',
            lineHeight: '1.6',
            color: 'inherit',
          }}>
            {processInlineMarkdown(trimmedLine)}
          </p>
        );
      } else if (index < lines.length - 1 && !inList) {
        // Empty line for spacing (only if not in a list)
        elements.push(<br key={`br-${index}`} />);
      }
    }
  });

  // Close any remaining list
  if (inList && currentList.length > 0) {
    elements.push(
      <ol key={`list-final`} style={{
        margin: '8px 0',
        paddingLeft: '24px',
        color: 'inherit',
      }}>
        {currentList.map((item, itemIndex) => (
          <li key={itemIndex} style={{
            marginBottom: '8px',
            lineHeight: '1.6',
            color: 'inherit',
          }}>
            <div>{processInlineMarkdown(item.content)}</div>
            {item.subItems.length > 0 && (
              <ul style={{
                marginTop: '6px',
                marginBottom: '4px',
                paddingLeft: '24px',
                listStyleType: 'disc',
                color: 'inherit',
              }}>
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex} style={{
                    marginBottom: '4px',
                    lineHeight: '1.5',
                    color: 'inherit',
                  }}>
                    {processInlineMarkdown(subItem)}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    );
  }

  return <div style={{ wordBreak: 'break-word', color: 'inherit' }}>{elements}</div>;
};

export default MarkdownRenderer;
