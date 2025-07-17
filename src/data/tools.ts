
import { Code, Type, Globe, Mail, Settings, Link, FileText, Hash, Shuffle, Search } from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: any;
  component: string;
}

export interface ToolCategory {
  category: string;
  icon: any;
  items: Tool[];
}

export const tools: ToolCategory[] = [
  {
    category: "Text & Content",
    icon: Type,
    items: [
      {
        id: "extract-links",
        name: "Extract Links",
        description: "Extract all URLs from text",
        icon: Link,
        component: "ExtractLinks"
      },
      {
        id: "merge-links",
        name: "Merge Links",
        description: "Combine multiple URLs with separator",
        icon: Link,
        component: "MergeLinks"
      },
      {
        id: "split-links",
        name: "Split Links",
        description: "Separate links into multiple lines",
        icon: Link,
        component: "SplitLinks"
      },
      {
        id: "remove-duplicates",
        name: "Remove Duplicates",
        description: "Remove repeated lines or entries",
        icon: FileText,
        component: "RemoveDuplicates"
      },
      {
        id: "clean-links",
        name: "Clean Links",
        description: "Remove tracking parameters",
        icon: Link,
        component: "CleanLinks"
      },
      {
        id: "url-encode-decode",
        name: "URL Encode/Decode",
        description: "Convert to/from URL-safe format",
        icon: Code,
        component: "UrlEncodeDecode"
      },
      {
        id: "remove-extra-spaces",
        name: "Remove Extra Spaces",
        description: "Replace multiple spaces with one",
        icon: Type,
        component: "RemoveExtraSpaces"
      },
      {
        id: "reverse-text",
        name: "Reverse Text",
        description: "Reverse the entire input string",
        icon: Shuffle,
        component: "ReverseText"
      },
      {
        id: "sort-lines",
        name: "Sort Lines",
        description: "Sort text lines alphabetically",
        icon: FileText,
        component: "SortLines"
      },
      {
        id: "shuffle-lines",
        name: "Shuffle Lines",
        description: "Randomize line order",
        icon: Shuffle,
        component: "ShuffleLines"
      },
      {
        id: "find-replace",
        name: "Find & Replace",
        description: "Basic find and replace tool",
        icon: Search,
        component: "FindReplace"
      },
      {
        id: "text-statistics",
        name: "Text Statistics",
        description: "Character, word, sentence count",
        icon: Hash,
        component: "TextStatistics"
      },
      {
        id: "extract-numbers",
        name: "Extract Numbers",
        description: "Extract all numbers from text",
        icon: Hash,
        component: "ExtractNumbers"
      },
      {
        id: "highlight-keyword",
        name: "Highlight Keyword",
        description: "Search and highlight text",
        icon: Search,
        component: "HighlightKeyword"
      },
      {
        id: "remove-html-tags",
        name: "Remove HTML Tags",
        description: "Strip HTML, keep plain text",
        icon: Code,
        component: "RemoveHtmlTags"
      },
      {
        id: "remove-empty-lines",
        name: "Remove Empty Lines",
        description: "Delete all blank lines",
        icon: FileText,
        component: "RemoveEmptyLines"
      },
      {
        id: "case-converter",
        name: "Case Converter",
        description: "Convert text case",
        icon: Type,
        component: "CaseConverter"
      },
      {
        id: "count-word-occurrences",
        name: "Count Word Occurrences",
        description: "Count word frequency",
        icon: Hash,
        component: "CountWordOccurrences"
      }
    ]
  },
  {
    category: "Web & Link Utilities",
    icon: Globe,
    items: [
      {
        id: "bulk-open-links",
        name: "Bulk Open Links",
        description: "Open multiple links in tabs",
        icon: Globe,
        component: "BulkOpenLinks"
      },
      {
        id: "validate-urls",
        name: "Validate URLs",
        description: "Check URL format validity",
        icon: Globe,
        component: "ValidateUrls"
      },
      {
        id: "extract-domains",
        name: "Extract Domains",
        description: "Get domain names from URLs",
        icon: Globe,
        component: "ExtractDomains"
      },
      {
        id: "convert-markdown-links",
        name: "Convert to Markdown",
        description: "Turn URLs into markdown format",
        icon: FileText,
        component: "ConvertMarkdownLinks"
      },
      {
        id: "convert-html-links",
        name: "Convert to HTML",
        description: "Turn URLs into HTML tags",
        icon: Code,
        component: "ConvertHtmlLinks"
      },
      {
        id: "add-utm-parameters",
        name: "Add UTM Parameters",
        description: "Append UTM tracking",
        icon: Link,
        component: "AddUtmParameters"
      },
      {
        id: "slug-generator",
        name: "Slug Generator",
        description: "Create URL-friendly slugs",
        icon: Link,
        component: "SlugGenerator"
      },
      {
        id: "base64-encode-decode",
        name: "Base64 Encode/Decode",
        description: "Encode/decode base64 strings",
        icon: Code,
        component: "Base64EncodeDecode"
      }
    ]
  },
  {
    category: "Developer Tools",
    icon: Code,
    items: [
      {
        id: "minify-css-js",
        name: "Minify CSS/JS",
        description: "Minify code for production",
        icon: Code,
        component: "MinifyCssJs"
      },
      {
        id: "json-formatter",
        name: "JSON Formatter",
        description: "Format and beautify JSON",
        icon: Code,
        component: "JsonFormatter"
      },
      {
        id: "csv-to-json",
        name: "CSV to JSON",
        description: "Convert CSV to JSON format",
        icon: Code,
        component: "CsvToJson"
      },
      {
        id: "rgb-hex-converter",
        name: "RGB ↔ HEX Converter",
        description: "Convert color values",
        icon: Code,
        component: "RgbHexConverter"
      },
      {
        id: "uuid-generator",
        name: "UUID Generator",
        description: "Generate unique IDs",
        icon: Hash,
        component: "UuidGenerator"
      },
      {
        id: "lorem-ipsum",
        name: "Lorem Ipsum Generator",
        description: "Generate filler text",
        icon: Type,
        component: "LoremIpsum"
      },
      {
        id: "http-headers-parser",
        name: "HTTP Headers Parser",
        description: "Analyze HTTP headers",
        icon: Code,
        component: "HttpHeadersParser"
      },
      {
        id: "meta-tags-extractor",
        name: "Meta Tags Extractor",
        description: "Extract meta tags from HTML",
        icon: Code,
        component: "MetaTagsExtractor"
      }
    ]
  },
  {
    category: "Email Tools",
    icon: Mail,
    items: [
      {
        id: "extract-emails",
        name: "Extract Emails",
        description: "Extract email addresses from text",
        icon: Mail,
        component: "ExtractEmails"
      },
      {
        id: "validate-emails",
        name: "Validate Emails",
        description: "Check email format validity",
        icon: Mail,
        component: "ValidateEmails"
      },
      {
        id: "extract-email-domains",
        name: "Extract Email Domains",
        description: "Get domains from email addresses",
        icon: Mail,
        component: "ExtractEmailDomains"
      },
      {
        id: "generate-fake-emails",
        name: "Generate Fake Emails",
        description: "Create test email addresses",
        icon: Mail,
        component: "GenerateFakeEmails"
      }
    ]
  },
  {
    category: "General Utilities",
    icon: Settings,
    items: [
      {
        id: "password-generator",
        name: "Password Generator",
        description: "Generate secure passwords",
        icon: Settings,
        component: "PasswordGenerator"
      },
      {
        id: "fake-data-generator",
        name: "Fake Data Generator",
        description: "Generate fake names & addresses",
        icon: Settings,
        component: "FakeDataGenerator"
      }
    ]
  }
];
