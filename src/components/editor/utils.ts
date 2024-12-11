import {
    ElementTransformer,
    MultilineElementTransformer,
    TextFormatTransformer,
    TextMatchTransformer,
    Transformer
} from '@lexical/markdown';

export function indexBy<T>(
    list: Array<T>,
    callback: (arg0: T) => string | undefined
): Readonly<Record<string, Array<T>>> {
    const index: Record<string, Array<T>> = {};

    for (const item of list) {
        const key = callback(item);

        if (!key) {
            continue;
        }

        if (index[key]) {
            index[key].push(item);
        } else {
            index[key] = [item];
        }
    }

    return index;
}

export function transformersByType(transformers: Array<Transformer>): Readonly<{
    element: Array<ElementTransformer>;
    multilineElement: Array<MultilineElementTransformer>;
    textFormat: Array<TextFormatTransformer>;
    textMatch: Array<TextMatchTransformer>;
}> {
    const byType = indexBy(transformers, (t) => t.type);

    return {
        element: (byType.element || []) as Array<ElementTransformer>,
        multilineElement: (byType['multiline-element'] ||
            []) as Array<MultilineElementTransformer>,
        textFormat: (byType['text-format'] ||
            []) as Array<TextFormatTransformer>,
        textMatch: (byType['text-match'] || []) as Array<TextMatchTransformer>
    };
}
