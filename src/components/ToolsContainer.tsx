
import React, { useEffect } from 'react';
import { Activity, Shield, Clock } from 'lucide-react';
import { Tool } from '../data/tools';

// Import all tool components
import { ExtractLinks } from './tools/ExtractLinks';
import { MergeLinks } from './tools/MergeLinks';
import { SplitLinks } from './tools/SplitLinks';
import { RemoveDuplicates } from './tools/RemoveDuplicates';
import { CleanLinks } from './tools/CleanLinks';
import { UrlEncodeDecode } from './tools/UrlEncodeDecode';
import { RemoveExtraSpaces } from './tools/RemoveExtraSpaces';
import { ReverseText } from './tools/ReverseText';
import { SortLines } from './tools/SortLines';
import { ShuffleLines } from './tools/ShuffleLines';
import { FindReplace } from './tools/FindReplace';
import { TextStatistics } from './tools/TextStatistics';
import { ExtractNumbers } from './tools/ExtractNumbers';
import { HighlightKeyword } from './tools/HighlightKeyword';
import { RemoveHtmlTags } from './tools/RemoveHtmlTags';
import { RemoveEmptyLines } from './tools/RemoveEmptyLines';
import { CaseConverter } from './tools/CaseConverter';
import { CountWordOccurrences } from './tools/CountWordOccurrences';
import { BulkOpenLinks } from './tools/BulkOpenLinks';
import { ValidateUrls } from './tools/ValidateUrls';
import { ExtractDomains } from './tools/ExtractDomains';
import { ConvertMarkdownLinks } from './tools/ConvertMarkdownLinks';
import { ConvertHtmlLinks } from './tools/ConvertHtmlLinks';
import { AddUtmParameters } from './tools/AddUtmParameters';
import { SlugGenerator } from './tools/SlugGenerator';
import { Base64EncodeDecode } from './tools/Base64EncodeDecode';
import { MinifyCssJs } from './tools/MinifyCssJs';
import { JsonFormatter } from './tools/JsonFormatter';
import { CsvToJson } from './tools/CsvToJson';
import { RgbHexConverter } from './tools/RgbHexConverter';
import { UuidGenerator } from './tools/UuidGenerator';
import { LoremIpsum } from './tools/LoremIpsum';
import { HttpHeadersParser } from './tools/HttpHeadersParser';
import { MetaTagsExtractor } from './tools/MetaTagsExtractor';
import { ExtractEmails } from './tools/ExtractEmails';
import { ValidateEmails } from './tools/ValidateEmails';
import { ExtractEmailDomains } from './tools/ExtractEmailDomains';
import { GenerateFakeEmails } from './tools/GenerateFakeEmails';
import { PasswordGenerator } from './tools/PasswordGenerator';
import { FakeDataGenerator } from './tools/FakeDataGenerator';

interface ToolsContainerProps {
  selectedTool: Tool;
  sidebarCollapsed: boolean;
}

const componentMap: { [key: string]: React.ComponentType } = {
  ExtractLinks,
  MergeLinks,
  SplitLinks,
  RemoveDuplicates,
  CleanLinks,
  UrlEncodeDecode,
  RemoveExtraSpaces,
  ReverseText,
  SortLines,
  ShuffleLines,
  FindReplace,
  TextStatistics,
  ExtractNumbers,
  HighlightKeyword,
  RemoveHtmlTags,
  RemoveEmptyLines,
  CaseConverter,
  CountWordOccurrences,
  BulkOpenLinks,
  ValidateUrls,
  ExtractDomains,
  ConvertMarkdownLinks,
  ConvertHtmlLinks,
  AddUtmParameters,
  SlugGenerator,
  Base64EncodeDecode,
  MinifyCssJs,
  JsonFormatter,
  CsvToJson,
  RgbHexConverter,
  UuidGenerator,
  LoremIpsum,
  HttpHeadersParser,
  MetaTagsExtractor,
  ExtractEmails,
  ValidateEmails,
  ExtractEmailDomains,
  GenerateFakeEmails,
  PasswordGenerator,
  FakeDataGenerator,
};

export const ToolsContainer: React.FC<ToolsContainerProps> = ({
  selectedTool,
  sidebarCollapsed,
}) => {
  useEffect(() => {
    // Track tool usage
    if (selectedTool) {
      const recentTools = JSON.parse(localStorage.getItem('recentTools') || '[]');
      const existingIndex = recentTools.findIndex((tool: any) => tool.id === selectedTool.id);
      
      if (existingIndex >= 0) {
        recentTools[existingIndex].lastUsed = new Date();
        recentTools[existingIndex].usageCount += 1;
      } else {
        recentTools.unshift({
          id: selectedTool.id,
          name: selectedTool.name,
          description: selectedTool.description,
          lastUsed: new Date(),
          usageCount: 1,
        });
      }
      
      // Keep only last 20 tools
      recentTools.splice(20);
      localStorage.setItem('recentTools', JSON.stringify(recentTools));

      // Update stats
      const stats = JSON.parse(localStorage.getItem('userStats') || '{"totalSessions": 0, "toolsUsed": 0, "timeActive": 0}');
      stats.toolsUsed += 1;
      localStorage.setItem('userStats', JSON.stringify(stats));
    }
  }, [selectedTool]);

  if (!selectedTool) return null;

  const ToolComponent = componentMap[selectedTool.component];

  if (!ToolComponent) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">Tool Not Found</h2>
          <p className="text-muted-foreground">The component "{selectedTool.component}" is not implemented yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Tool Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/20 rounded border border-primary/30">
                <selectedTool.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground font-mono">
                  {selectedTool.name.toUpperCase()}
                </h1>
                <p className="text-sm text-muted-foreground font-mono">
                  OPERATION STATUS: ACTIVE
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full status-online"></div>
                <span className="text-xs font-mono text-muted-foreground">SECURE</span>
              </div>
              <div className="text-xs font-mono text-muted-foreground">
                {new Date().toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  second: '2-digit'
                })} UTC
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Content */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 max-w-6xl">
          <div className="tactical-card">
            <ToolComponent />
          </div>
        </div>
      </div>
    </div>
  );
};
