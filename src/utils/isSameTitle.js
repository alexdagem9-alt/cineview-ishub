// A movie and a series can share the same numeric id, so compare the type as well
export const isSameTitle = (a, b) => a.id === b.id && a.type === b.type;
