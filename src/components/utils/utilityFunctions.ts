// add element to array
export const addElem = (el: HTMLElement | null, arr: HTMLElement[]) => {
  if (el && !arr.includes(el)) {
    arr.push(el);
  }
};  