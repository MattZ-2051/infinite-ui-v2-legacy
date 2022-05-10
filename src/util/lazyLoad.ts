export function lazyLoadVideoSource(videoElement: HTMLVideoElement) {
  for (const source in videoElement.children) {
    const videoSource = videoElement.children[source];
    if (typeof videoSource.tagName === 'string' && videoSource.tagName === 'SOURCE') {
      (<HTMLSourceElement>videoSource).src = (<HTMLSourceElement>videoSource).dataset.src;
    }
  }
  videoElement.load();
}
