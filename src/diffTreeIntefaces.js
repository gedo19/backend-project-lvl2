/**
 * CONSTRUCTORS
 */

const mkNestedProperty = (key, value = [], status = 'unchanged') => ({
  key,
  value,
  type: 'nestedProperty',
  status,
});
const mkProperty = (key, value, status = 'unchanged', meta = {}) => ({
  key,
  value,
  type: 'property',
  status,
  meta,
});

/**
 * SELECTORS
 */

const getKey = (property) => property.key;
const getValue = (property) => property.value;
const getMeta = (property) => property.meta;
const getStatus = (property) => property.status;
const getOldValue = (property) => getMeta(property).oldValue;
const isNestedProperty = (property) => property.type === 'nestedProperty';

export {
  mkProperty,
  mkNestedProperty,
  getKey,
  getValue,
  getMeta,
  isNestedProperty,
  getStatus,
  getOldValue,
};
