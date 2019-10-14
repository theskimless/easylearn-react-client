export const splitWordProps = word => ({
    ...word,
    definitions: word.definitions.split(","),
    examples: word.examples.split(",")
});