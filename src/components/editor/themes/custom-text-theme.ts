const CustomTextTheme = {
    ltr: 'text-left',
    rtl: 'text-right',
    paragraph: 'mb-2',
    quote: 'text-gray-500 border border-gray-300',
    heading: {
        h1: 'text-3xl',
        h2: 'text-2xl ',
        h3: 'text-xl',
        h4: 'text-base',
        h5: 'text-sm'
    },
    list: {
        nested: {
            listitem: 'list-none'
        },
        ol: 'list-decimal ml-4',
        ul: 'list-disc ml-4',
        listitem: 'my-2 mx-2'
    },
    link: 'text-blue-600 no-underline hover:underline',
    text: {
        bold: 'font-bold',
        italic: 'italic',
        overflowed: 'truncate',
        hashtag: 'text-blue-500',
        underline: 'underline',
        strikethrough: 'line-through',
        underlineStrikethrough: 'underline line-through',
        code: 'bg-gray-200'
    },
    code: 'bg-gray-200'
};

export default CustomTextTheme;
