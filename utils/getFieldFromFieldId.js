export function getFieldFromFieldId(
  fieldId,
  fieldName = "content_id",
  fields,
  shared
) {
  if (!fieldId || !fields || fields?.length === 0) return null;

  const matches = fields.filter((el) =>
    shared
      ? el[fieldName] === fieldId && el.shared === true
      : el[fieldName] === fieldId
  );

  if (matches && matches.length === 0) return [];
  if (matches && matches.length === 1) return matches[0];
  if (matches && matches.length > 1) return matches;
  return {};
}
