import clickOutside from './clickOutside';

describe('clickOutside', () => {
  let element: HTMLElement;
  let sibling: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
    sibling = document.createElement('div');
    document.body.append(element);
    document.body.append(sibling);
  });

  afterEach(() => {
    jest.clearAllMocks();
    element.remove();
    sibling.remove();
  });

  function setup(parameters) {
    const action = clickOutside(element, parameters);
    return action;
  }

  it('calls callback on outside click', () => {
    const callback = jest.fn();
    setup({ cb: callback });

    expect(callback).not.toHaveBeenCalled();
    sibling.click();
    expect(callback).toHaveBeenCalled();
  });

  it('does not call callback when disabled', function () {
    const callback = jest.fn();
    setup({ enabled: false, cb: callback });

    sibling.click();
    expect(callback).not.toHaveBeenCalled();
  });

  it('does not call callback when element clicked', function () {
    const callback = jest.fn();
    setup({ enabled: true, cb: callback });

    element.click();
    expect(callback).not.toHaveBeenCalled();
  });

  it('updates parameters', function () {
    const callback = jest.fn();
    const action = setup({ enabled: true, cb: callback });

    action.update({ enabled: false });
    sibling.click();
    expect(callback).not.toHaveBeenCalled();
  });
});
