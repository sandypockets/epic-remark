function visit(node, type, callback) {
  if (node.type === type) {
    callback(node);
  }

  if (node.children) {
    node.children.forEach(child => {
      visit(child, type, callback);
    });
  }
}

export default function embed() {
  function getEmbedMethod(url) {
    if (url.includes('gist.github.com')) {
      return 'script';
    } else if (url.includes('youtube.com/watch?v=')) {
      return 'youtube';
    } else if (url.includes('vimeo.com')) {
      return 'iframe';
    } else {
      return 'default';
    }
  }

  function transformYouTubeUrl(url) {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get('v');
    return `https://www.youtube.com/embed/${videoId}`;
  }

  return tree => {
    visit(tree, 'element', node => {
      if (node.tagName === 'p' && node.children.length >= 2) {
        const firstChild = node.children[0];
        const secondChild = node.children[1];

        if (
          firstChild.type === 'text' &&
          firstChild.value.trim() === '!embed' &&
          secondChild.type === 'element' &&
          secondChild.tagName === 'a'
        ) {
          const url = secondChild.properties.href;
          const embedMethod = getEmbedMethod(url);

          switch (embedMethod) {
            case 'script':
              const gistIframeUrl = `${url}.pibb`;
              node.type = 'raw';
              node.value = `<div class="epic-remark-gist"><iframe src="${gistIframeUrl}" style="width:100%; border:none;"></iframe></div>`;
              break;
            case 'youtube':
              const embedUrl = transformYouTubeUrl(url);
              node.type = 'raw';
              node.value = `<iframe class="epic-remark-youtube" src="${embedUrl}" width="100%" title="YouTube video player" frameborder="0" allowfullscreen></iframe>`;
              break;
            case 'iframe':
              node.type = 'raw';
              node.value = `<iframe src="${url}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
              break;
            default:
              break;
          }
        }
      }
    });
  };
}
