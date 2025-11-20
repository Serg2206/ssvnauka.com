
// Простая функция для конвертации markdown в HTML
// В production можно использовать библиотеки типа marked или remark
export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Заголовки
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold mt-8 mb-4">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold mt-10 mb-5">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mt-12 mb-6">$1</h1>');

  // Жирный текст
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-primary">$1</strong>');

  // Курсив
  html = html.replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>');

  // Списки
  html = html.replace(/^\- (.*$)/gim, '<li class="ml-6 list-disc">$1</li>');
  html = html.replace(/^\d+\. (.*$)/gim, '<li class="ml-6 list-decimal">$1</li>');

  // Код блоки
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre class="bg-surface p-4 rounded-lg my-4 overflow-x-auto"><code class="font-mono text-sm">$2</code></pre>');

  // Инлайн код
  html = html.replace(/`(.*?)`/gim, '<code class="bg-surface px-2 py-1 rounded font-mono text-sm text-accent">$1</code>');

  // Параграфы
  html = html.replace(/\n\n/gim, '</p><p class="mb-4 leading-relaxed">');
  html = '<p class="mb-4 leading-relaxed">' + html + '</p>';

  // Ссылки
  html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/gim, '<a href="$2" class="text-primary hover:text-accent underline">$1</a>');

  return html;
}
