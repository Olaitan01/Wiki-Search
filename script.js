const form= document.querySelector(".form")
form.addEventListener("submit",handleSubmit)

async function handleSubmit(event){
    event.preventDefault()

    const searchResult= document.querySelector(".search-result")
    searchResult.innerText=" "
    const circle= document.querySelector(".sk-circle")
    circle.classList.remove("hidden")
    const input= document.querySelector(".input").value
    const searchQuery= input.trim()

    try{
        const result= await searchWikipedia(searchQuery)

        if(result.query.searchinfo.totalhits===0){
            alert("No results found. Try differnt Keyword")
            return
        }
        displayResult(result)
    }
    catch(err){
        alert("Failed to search wikipedia")
    }
    finally{
        circle.classList.add("hidden")
    }
    
}

async function searchWikipedia(searchQuery){
    const endpoint=`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`
    const response= await fetch(endpoint)
    if(!response.ok){
        throw Error(response.statusText)
    }
    console.log(response)
  const json= await response.json()
  return json

}

function displayResult(result){
    const searchResult= document.querySelector(".search-result")
    


result.query.search.forEach(result => {
    const url=`https://en.wikipedia.org/?curid=${result.pageid}` 

    searchResult.insertAdjacentHTML("beforeend",`<div class="result-item">
    <h3 class="result-title">
    <a href="${url}" target="_blank" rel="noopener" >${result.title}</a>
    </h3>
    <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>
    <span class="result-snippet">${result.snippet}</span><br>
    </div>`)
    
});
}