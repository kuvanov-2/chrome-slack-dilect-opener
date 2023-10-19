document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get(['Tworkspace_id'], function(data) {
    document.getElementById('Tworkspace_id').value = data.Tworkspace_id || '';
  });

  document.getElementById('save').addEventListener('click', function() {
    const workspaceId = document.getElementById('Tworkspace_id').value;
    chrome.storage.sync.set({Tworkspace_id: workspaceId});
  });
});
