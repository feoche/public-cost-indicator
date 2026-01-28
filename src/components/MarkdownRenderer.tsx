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
    const boldRegex = /\*\*(.+?)\*\*/g;
    let match;
    let keyCounter = 0;

    while ((match = boldRegex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > currentIndex) {
        parts.push(text.substring(currentIndex, match.index));
      }
      // Add bold text
      parts.push(
        <strong key={`bold-${keyCounter++}`}>{match[1]}</strong>
      );
      currentIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (currentIndex < text.length) {
      parts.push(text.substring(currentIndex));
    }

    return parts.length > 0 ? parts : [text];
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    // Check if it's a numbered list item (e.g., "1. **text**")
    const listMatch = trimmedLine.match(/^(\d+)\.\s+(.+)$/);
    // Check if it's a sub-item (e.g., "- Avez-vous...")
    const subItemMatch = trimmedLine.match(/^-\s+(.+)$/);
    
    if (listMatch) {
      if (!inList) {
        inList = true;
        currentList = [];
      }
      currentList.push({ content: listMatch[2], subItems: [] });
    } else if (subItemMatch && inList && currentList.length > 0) {
      // Add as sub-item to the last list item
      currentList[currentList.length - 1].subItems.push(subItemMatch[1]);
    } else {
      // If we were in a list, close it
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

      // Process regular lines
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
      } else if (index < lines.length - 1) {
        // Empty line for spacing
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
