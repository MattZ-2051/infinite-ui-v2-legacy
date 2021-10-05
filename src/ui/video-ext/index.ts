export default function videoDisableOptions(node: HTMLElement) {
  node.setAttribute('controlsList', 'nodownload noplaybackrate');
  node.setAttribute('disablePictureInPicture', 'true');
  return {};
}
