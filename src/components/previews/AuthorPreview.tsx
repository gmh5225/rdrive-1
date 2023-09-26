import { FC, ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrowNight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import 'katex/dist/katex.min.css';
import useFileContent from '../../utils/fetchOnMount';
import { Skeleton } from '@nextui-org/react';
import { Author } from '../GitHub/Author';

const AuthorPreview: FC<{
  path: string;
}> = ({ path}) => {
  const parentPath =  path;

  const { response: content, error, validating } = useFileContent(
    `/api/raw/?path=${parentPath}/credit.md`,
    path
  );

  const customRenderer = {
    code({ className, children, inline, ...props }: { className?: string | undefined; children: ReactNode; inline?: boolean }) {
      if (inline) {
        return <code className={className} {...props}>{children}</code>;
      }

      const match = /language-(\w+)/.exec(className || '');
      return (
        <SyntaxHighlighter language={match ? match[1] : 'language-text'} style={tomorrowNight} PreTag="div" {...props}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      );
    },
  };

  if (error) {
    return (
      <Author username="therockstarind" />
    );
  }
  if (validating) {
    return (
      <div className="flex" >
          <Skeleton className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
    );
  }

// Parse credit content and extract the name
const creditMatches = content.match(/---\s*\n(.*?)\n---/s);
let username = '';

if (creditMatches && creditMatches.length > 1) {
  const creditData = creditMatches[1];
  const creditFields = creditData.split('\n').map((field) => field.trim());

  for (const field of creditFields) {
    const [key, value] = field.split(':').map((part) => part.trim());
    if (key === 'username') {
      username = value;
      break;
    }
  }
}


  return (
    <main>
      <Author username={username} />
      <ReactMarkdown
        // @ts-ignore
        remarkPlugins={[remarkGfm, remarkMath]}
        // @ts-ignore
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={customRenderer}
      >
        {content.replace(/---\s*\n.*?\n---/s, '')}
      </ReactMarkdown>
    </main>
  );
};

export default AuthorPreview;
