export const SerializeForm = (form) => {
  const formData = new FormData(form);
  const completeObj = {};
  for (let [name, value] of formData) {
    if (value.length != 0) {
      completeObj[name] = value;
    }
  }
  return completeObj;
};
