/**
 * Extrait les flavors d'instance compute (sans GPU) depuis docs/cloud.json
 * et génère src/data/instance-flavors.json pour le calculateur.
 * Usage: node scripts/extract-instance-flavors.cjs
 */

const fs = require('fs');
const path = require('path');

const cloudPath = path.join(__dirname, '../docs/cloud.json');
const outPath = path.join(__dirname, '../src/data/instance-flavors.json');

const raw = fs.readFileSync(cloudPath, 'utf8');
const catalog = JSON.parse(raw);
// Les instances compute sont dans catalog.addons, pas plans
const instancePlans = (catalog.addons || []).filter(p => p.product === 'publiccloud-instance');

const flavors = [];
const seen = new Set();

for (const plan of instancePlans) {
  if (!plan.planCode?.endsWith('.consumption')) continue;
  // Exclure les variantes LZ, 3AZ etc. pour garder les plans "standard"
  if (/\.(LZ\.|3AZ|LZ\.EU|LZ\.AF|EUROZONE)/.test(plan.planCode)) continue;
  const tech = plan.blobs?.technical;
  if (!tech?.cpu?.cores || !tech?.memory?.size) continue;
  // Exclure les instances GPU pour le calculateur "simple"
  if (tech.gpu) continue;

  const storageGb = tech.storage?.disks?.[0]?.capacity ?? 0;
  const commercial = plan.blobs?.commercial || {};
  const brick = commercial.brick || '';
  const brickSubtype = commercial.brickSubtype || '';
  const key = `${plan.planCode}`;
  if (seen.has(key)) continue;
  seen.add(key);

  flavors.push({
    planCode: plan.planCode,
    name: tech.name || plan.invoiceName || plan.planCode,
    cpu: tech.cpu.cores,
    ram: tech.memory.size,
    storageGb,
    os: tech.os?.family || 'linux',
    brick,
    brickSubtype,
  });
}

flavors.sort((a, b) => {
  if (a.cpu !== b.cpu) return a.cpu - b.cpu;
  if (a.ram !== b.ram) return a.ram - b.ram;
  return a.storageGb - b.storageGb;
});

const dir = path.dirname(outPath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(flavors, null, 2), 'utf8');
console.log('Written', flavors.length, 'flavors to', outPath);
