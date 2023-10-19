// リンクの置換処理を関数化
function replaceLinks(workspaceId) {
  const links = document.querySelectorAll('a[href*="slack.com/archives"]');
  links.forEach(link => {
    const href = link.getAttribute('href');
    const match = href.match(/https:\/\/(.*?).slack.com\/archives\/(.*)/);
    if (match) {
      const originalSubdomain = match[1];
      const channelId = match[2];
      const newHref = `https://app.slack.com/client/${workspaceId}/${channelId}`;
      link.setAttribute('href', newHref);
    }
  });
}  

// MutationObserverのコールバック関数
function observeMutations(mutations, observer) {
  chrome.storage.sync.get(['Tworkspace_id'], function(data) {
    const workspaceId = data.Tworkspace_id;
    if (!workspaceId) {
      console.log('Workspace ID is not set. Please set it in the extension options.')
      return;
    }
    replaceLinks(workspaceId);
  });
}

// MutationObserverのインスタンスを作成
const observer = new MutationObserver(observeMutations);

// オプションを設定
const config = {
  childList: true,
  subtree: true
};

// body要素に対して監視を開始
observer.observe(document.body, config);

// 初回のリンク置換
chrome.storage.sync.get(['Tworkspace_id'], function(data) {
  const workspaceId = data.Tworkspace_id;
  if (workspaceId) {
    replaceLinks(workspaceId);
  }
});
