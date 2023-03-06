const myButton = document.getElementById('myButton');
const countValue = document.getElementById('count');
const search_results = document.getElementsByClassName('search-result');
myButton.addEventListener('click', async () => {
  
  myButton.innerText= "Stop Connection";
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
              target: { tabId: tab.id },
              files: ['connect.js'],
            });

            if (search_results && search_results.length != 0) {
              var countVal = search_results.length;
          }
           countValue.innerHTML = countVal;
})



