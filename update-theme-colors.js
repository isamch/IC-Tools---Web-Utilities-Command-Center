const fs = require('fs');
const path = require('path');

// Function to update a single file
function updateFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;

    // Replace text-gray-700 with tool-label or text-foreground
    if (content.includes('text-gray-700')) {
      content = content.replace(
        /className="block text-sm font-medium text-gray-700mb-2"/g,
        'className="tool-label"'
      );
      content = content.replace(
        /className=text-sm text-gray-700      className=text-sm text-foreground"/g,
        'className=text-sm text-foreground'
      );
      updated = true;
    }

    // Replace border-gray-200input styling with tool-input
    if (content.includes('border-gray-200')) {
      content = content.replace(
        /className=w-full p-3 border border-gray-200 rounded-lg focus:ring-2ocus:ring-blue-500 focus:border-transparent"/g,
        'className="tool-input"'
      );
      content = content.replace(
        /className="w-\d+ p-3 border border-gray-200 rounded-lg focus:ring-2ocus:ring-blue-500 focus:border-transparent"/g,
        'className="tool-input"'
      );
      updated = true;
    }

    // Replace bg-white with bg-card
    if (content.includes('bg-white')) {
      content = content.replace(/bg-white/g, 'bg-card');
      updated = true;
    }

    // Replace bg-gray-50 with bg-secondary
    if (content.includes('bg-gray-50')) {
      content = content.replace(/bg-gray-50bg-secondary/g, 'bg-secondary');
      updated = true;
    }

    // Replace hover:bg-gray-50 with hover:bg-secondary
    if (content.includes('hover:bg-gray-50')) {
      content = content.replace(/hover:bg-gray-50/g, 'hover:bg-secondary');
      updated = true;
    }

    // Replace border-gray-200 with border-border
    if (content.includes('border-gray-200')) {
      content = content.replace(/border-gray-200/g, 'border-border');
      updated = true;
    }

    // Replace mr-2 for checkboxes with tool-checkbox
    if (content.includes('className="mr-2"')) {
      content = content.replace(
        /<input\s+type="checkbox"^>]*className="mr-2"/g,
        (match) => match.replace('className="mr-2', 'className="tool-checkbox')
      );
      updated = true;
    }

    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
    } else {
      console.log(`⏭️  No changes needed: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

// Function to recursively find all .tsx files in the tools directory
function findTsxFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findTsxFiles(fullPath));
    } else if (item.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Main execution
const toolsDir = path.join(__dirname, 'src', 'components', 'tools');
const files = findTsxFiles(toolsDir);

console.log('🎨 Updating theme colors in tool components...\n');

for (const file of files) {
  updateFile(file);
}

console.log('\n✨ Theme color update complete!');
console.log('n📝 Manual fixes you may need to make:');
console.log('1. Check for any remaining hardcoded colors');
console.log('2. Update table headers to use text-foreground');
console.log('3. Ensure all labels use tool-label class');
console.log('4. Verify all inputs use tool-input class');
console.log('5. Check that checkboxes use tool-checkbox class'); 