# JzMT - API Documentation

An Out of The Box Markdown noTe in Web built with Next.js and Lexical Editor.

## Table of Contents

- [Project Overview](#project-overview)
- [Core Components](#core-components)
- [UI Components](#ui-components)
- [Custom Hooks](#custom-hooks)
- [Editor System](#editor-system)
- [Utilities](#utilities)
- [Theme System](#theme-system)
- [Usage Examples](#usage-examples)
- [Development Guide](#development-guide)

## Project Overview

JzMT is a modern web-based markdown note-taking application built with:
- **Next.js 15** with TypeScript
- **Lexical Editor** for rich text editing with markdown support
- **Radix UI** components for accessible UI primitives
- **Tailwind CSS** for styling
- **next-themes** for theme management

### Key Features

- Real-time markdown editing with live preview
- Custom Lexical nodes and plugins for enhanced markdown support
- Responsive design with mobile support
- Dark/light theme switching
- Extensible sidebar navigation
- Type-safe development with TypeScript

## Core Components

### AppSidebar

A dual-sidebar layout component with navigation and content areas.

```typescript
interface AppSidebarProps {
  children: React.ReactNode;
}

export function AppSidebar({ children }: AppSidebarProps): JSX.Element
```

**Features:**
- Dual sidebar layout (icon + content)
- Responsive design with mobile handling
- Team selection and user profile management
- Mail/content management interface

**Usage:**
```tsx
import { AppSidebar } from '@/components/app-sidebar';

function App() {
  return (
    <AppSidebar>
      <YourMainContent />
    </AppSidebar>
  );
}
```

**Props:**
- `children`: React nodes to render in the main content area

### LexicalEditor

The main markdown editor component powered by Lexical.

```typescript
export default function LexicalEditor(): JSX.Element
```

**Features:**
- Custom markdown parsing and rendering
- Live text formatting (bold, italic, etc.)
- List support (ordered/unordered)
- Code blocks and syntax highlighting
- Link support
- Custom heading nodes
- Auto-focus functionality

**Usage:**
```tsx
import LexicalEditor from '@/components/editor/lexical-editor';

function NotePage() {
  return (
    <div className="editor-container">
      <LexicalEditor />
    </div>
  );
}
```

### ThemeProvider

Wrapper component for theme management using next-themes.

```typescript
interface ThemeProviderProps extends ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children, ...props }: ThemeProviderProps): JSX.Element
```

**Usage:**
```tsx
import ThemeProvider from '@/components/theme-provider';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <YourApp />
    </ThemeProvider>
  );
}
```

### ThemeToggle

A dropdown menu component for switching between light, dark, and system themes.

```typescript
export function ThemeToggle(): JSX.Element
```

**Features:**
- Three theme options: Light, Dark, System
- Visual icons for different states
- Accessible dropdown interface

**Usage:**
```tsx
import { ThemeToggle } from '@/components/theme-toggle';

function Header() {
  return (
    <div className="header">
      <ThemeToggle />
    </div>
  );
}
```

## UI Components

### Button

A versatile button component with multiple variants and sizes.

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>()
```

**Variants:**
- `default`: Primary button style
- `destructive`: For dangerous actions
- `outline`: Outlined button
- `secondary`: Secondary button style
- `ghost`: Minimal button style
- `link`: Link-styled button

**Sizes:**
- `default`: Standard size
- `sm`: Small button
- `lg`: Large button
- `icon`: Square icon button

**Usage:**
```tsx
import { Button } from '@/components/ui/button';

// Different variants
<Button variant="default">Primary Action</Button>
<Button variant="outline">Secondary Action</Button>
<Button variant="destructive">Delete</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">🎨</Button>

// As child (renders as different element)
<Button asChild>
  <Link href="/somewhere">Navigate</Link>
</Button>
```

### Card

A container component for grouping related content.

```typescript
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>()
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>()
const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>()
const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>()
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>()
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>()
```

**Usage:**
```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content of the card</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Input

A styled input component for forms.

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>()
```

**Usage:**
```tsx
import { Input } from '@/components/ui/input';

<Input type="email" placeholder="Enter your email" />
<Input type="password" placeholder="Password" />
<Input type="search" placeholder="Search..." />
```

### DropdownMenu

A flexible dropdown menu component system.

```typescript
const DropdownMenu: React.FC<DropdownMenuProps>
const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps>
const DropdownMenuContent: React.FC<DropdownMenuContentProps>
const DropdownMenuItem: React.FC<DropdownMenuItemProps>
const DropdownMenuSeparator: React.FC<DropdownMenuSeparatorProps>
// ... and more sub-components
```

**Usage:**
```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Sidebar

A comprehensive sidebar component system with responsive behavior.

```typescript
const SidebarProvider: React.FC<SidebarProviderProps>
const Sidebar: React.FC<SidebarProps>
const SidebarContent: React.FC<SidebarContentProps>
const SidebarHeader: React.FC<SidebarHeaderProps>
const SidebarFooter: React.FC<SidebarFooterProps>
const SidebarInset: React.FC<SidebarInsetProps>
// ... and more sub-components
```

**Usage:**
```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar';

<SidebarProvider>
  <Sidebar>
    <SidebarHeader>
      <h2>Navigation</h2>
    </SidebarHeader>
    <SidebarContent>
      <nav>Navigation items</nav>
    </SidebarContent>
    <SidebarFooter>
      <p>Footer content</p>
    </SidebarFooter>
  </Sidebar>
  <SidebarInset>
    <main>Main content</main>
  </SidebarInset>
</SidebarProvider>
```

## Custom Hooks

### useIsMobile

A hook for detecting mobile devices based on viewport width.

```typescript
export function useIsMobile(): boolean
```

**Features:**
- Responsive breakpoint: 768px
- Updates on window resize
- SSR-safe implementation

**Usage:**
```tsx
import { useIsMobile } from '@/hooks/use-mobile';

function ResponsiveComponent() {
  const isMobile = useIsMobile();
  
  return (
    <div>
      {isMobile ? (
        <MobileLayout />
      ) : (
        <DesktopLayout />
      )}
    </div>
  );
}
```

**Implementation Details:**
- Uses `window.matchMedia` for efficient media query listening
- Handles both initial state and resize events
- Returns `boolean` indicating mobile state

## Editor System

### Custom Nodes

#### MarkdownNode

A custom Lexical node for handling markdown-specific text rendering.

```typescript
export default class MarkdownNode extends TextNode {
  constructor(text: string, key?: NodeKey)
  static getType(): string
  static clone(node: MarkdownNode): MarkdownNode
  createDOM(config: EditorConfig, editor?: LexicalEditor): HTMLElement
  updateDOM(prevNode: MarkdownNode, dom: HTMLElement, config: EditorConfig): boolean
}

// Helper functions
export function $createMarkdownNode(text: string, key?: string): MarkdownNode
export function $isMarkdownNode(node: LexicalNode | null | undefined): node is MarkdownNode
```

**Usage:**
```tsx
import { $createMarkdownNode, $isMarkdownNode } from '@/components/editor/nodes/custom-markdown-node';

// In a Lexical command or transform
editor.update(() => {
  const markdownNode = $createMarkdownNode('**bold text**');
  // Insert or replace with markdown node
});
```

### Plugins

#### CustomMarkdownParser

A plugin that automatically parses markdown syntax as you type.

```typescript
export default function CustomMarkdownParser(): null
```

**Features:**
- Real-time markdown parsing
- Supports text formatting (bold, italic, etc.)
- Element transformations (headings, lists)
- Text match transformations
- Handles inline and block markdown syntax

**Usage:**
```tsx
import CustomMarkdownParser from '@/components/editor/plugins/custom-markdown-parser';
import { LexicalComposer } from '@lexical/react/LexicalComposer';

<LexicalComposer initialConfig={config}>
  <CustomMarkdownParser />
  {/* Other plugins */}
</LexicalComposer>
```

#### CustomTextPlugin

A plugin providing the main editable content area for the editor.

```typescript
export default function CustomTextPlugin(): JSX.Element
```

**Features:**
- Editable content area
- Error boundary handling
- Custom styling integration

### Themes

#### CustomEditorTheme

A comprehensive theme configuration for the Lexical editor.

```typescript
const CustomEditorTheme: EditorThemeClasses
```

**Includes styling for:**
- Text formatting (bold, italic, underline, strikethrough)
- Headings (h1-h6)
- Lists (ordered/unordered)
- Code blocks and inline code
- Links
- Quotes
- Syntax highlighting for code

**Usage:**
```tsx
import CustomEditorTheme from '@/components/editor/themes/custom-editor-theme';

const editorConfig = {
  theme: CustomEditorTheme,
  // other config
};
```

### Transformers

Custom markdown transformers for handling specific markdown syntax.

```typescript
// Available in src/components/editor/transformers/index.ts
export const CUSTOM_TRANSFORMERS: Array<Transformer>
```

**Features:**
- Element transformers for block-level markdown
- Text format transformers for inline formatting
- Text match transformers for pattern-based replacements
- Multiline element support

### Editor Utilities

#### Transformer Utilities

```typescript
export function indexBy<T>(
  list: Array<T>,
  callback: (arg0: T) => string | undefined
): Readonly<Record<string, Array<T>>>

export function transformersByType(transformers: Array<Transformer>): Readonly<{
  element: Array<ElementTransformer>;
  multilineElement: Array<MultilineElementTransformer>;
  textFormat: Array<TextFormatTransformer>;
  textMatch: Array<TextMatchTransformer>;
}>
```

**Usage:**
```tsx
import { transformersByType } from '@/components/editor/utils';

const transformers = [/* your transformers */];
const byType = transformersByType(transformers);

// Access categorized transformers
const elementTransformers = byType.element;
const textFormatTransformers = byType.textFormat;
```

## Utilities

### CSS Class Utility

A utility function for merging CSS classes with Tailwind CSS support.

```typescript
export function cn(...inputs: ClassValue[]): string
```

**Features:**
- Merges multiple class strings
- Handles conditional classes
- Optimizes Tailwind CSS classes (removes duplicates/conflicts)
- Based on `clsx` and `tailwind-merge`

**Usage:**
```tsx
import { cn } from '@/lib/utils';

// Basic usage
const className = cn('px-4', 'py-2', 'bg-blue-500');

// Conditional classes
const buttonClass = cn(
  'px-4 py-2 rounded',
  isActive && 'bg-blue-500',
  isDisabled && 'opacity-50 cursor-not-allowed'
);

// Merging with props
function Button({ className, ...props }) {
  return (
    <button 
      className={cn('default-button-classes', className)}
      {...props}
    />
  );
}
```

## Theme System

### Theme Configuration

The application supports three theme modes:
- **Light**: Light color scheme
- **Dark**: Dark color scheme  
- **System**: Follows system preference

### Theme Implementation

```tsx
// In your app layout or _app.tsx
import ThemeProvider from '@/components/theme-provider';

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <YourApp />
    </ThemeProvider>
  );
}
```

### Using Themes in Components

```tsx
import { useTheme } from 'next-themes';

function ThemedComponent() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  return (
    <div className="bg-background text-foreground">
      <p>Current theme: {theme}</p>
      <p>Resolved theme: {resolvedTheme}</p>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
    </div>
  );
}
```

## Usage Examples

### Basic Note Editor Setup

```tsx
import LexicalEditor from '@/components/editor/lexical-editor';
import { ThemeToggle } from '@/components/theme-toggle';

function NoteTakingApp() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Notes</h1>
        <ThemeToggle />
      </header>
      <main className="container mx-auto p-4">
        <div className="border rounded-lg">
          <LexicalEditor />
        </div>
      </main>
    </div>
  );
}
```

### Sidebar Layout with Editor

```tsx
import { AppSidebar } from '@/components/app-sidebar';
import LexicalEditor from '@/components/editor/lexical-editor';

function FullLayoutApp() {
  return (
    <AppSidebar>
      <main className="flex-1 p-4">
        <div className="h-full border rounded-lg">
          <LexicalEditor />
        </div>
      </main>
    </AppSidebar>
  );
}
```

### Custom Button Variants

```tsx
import { Button } from '@/components/ui/button';

function ButtonExamples() {
  return (
    <div className="space-x-2">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🎨</Button>
    </div>
  );
}
```

### Form with UI Components

```tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function LoginForm() {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Enter your password" />
        </div>
        <Button className="w-full">Sign In</Button>
      </CardContent>
    </Card>
  );
}
```

### Responsive Component with Mobile Hook

```tsx
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

function ResponsiveNavigation() {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">☰</Button>
        </SheetTrigger>
        <SheetContent>
          <nav className="space-y-4">
            <a href="/home">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>
        </SheetContent>
      </Sheet>
    );
  }
  
  return (
    <nav className="space-x-4">
      <a href="/home">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  );
}
```

## Development Guide

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── editor/           # Editor-specific components
│   │   ├── lexical-editor.tsx
│   │   ├── nodes/        # Custom Lexical nodes
│   │   ├── plugins/      # Custom Lexical plugins
│   │   ├── themes/       # Editor themes
│   │   └── transformers/ # Markdown transformers
│   ├── ui/               # Reusable UI components
│   └── *.tsx             # Other components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
└── contexts/             # React contexts
```

### Adding New Components

1. **Create the component file** in the appropriate directory
2. **Export the component** with proper TypeScript types
3. **Add documentation** following the patterns in this guide
4. **Include usage examples** in your component's JSDoc

```tsx
/**
 * MyComponent - A brief description
 * 
 * @example
 * ```tsx
 * <MyComponent prop="value">
 *   Content here
 * </MyComponent>
 * ```
 */
interface MyComponentProps {
  prop: string;
  children: React.ReactNode;
}

export function MyComponent({ prop, children }: MyComponentProps) {
  return <div data-prop={prop}>{children}</div>;
}
```

### Extending the Editor

To add new Lexical functionality:

1. **Create custom nodes** in `src/components/editor/nodes/`
2. **Add plugins** in `src/components/editor/plugins/`
3. **Update transformers** in `src/components/editor/transformers/`
4. **Register new nodes** in the editor configuration

```tsx
// Example: Adding a custom node
import { MyCustomNode } from './nodes/my-custom-node';

const editorConfig = {
  namespace: 'JzMT',
  theme: CustomEditorTheme,
  nodes: [
    // ... existing nodes
    MyCustomNode,
  ],
  // ... rest of config
};
```

### Styling Guidelines

- Use **Tailwind CSS** for styling
- Follow the **design system** established by shadcn/ui
- Use **CSS custom properties** for theme-specific values
- Leverage the **`cn()` utility** for conditional styling

### Type Safety

- All components should have **proper TypeScript interfaces**
- Use **generic types** where appropriate
- Leverage **`React.forwardRef`** for components that need ref forwarding
- Use **discriminated unions** for variant props

This documentation covers all the public APIs, components, and utilities in the JzMT project. For the most up-to-date information, refer to the source code and TypeScript definitions.