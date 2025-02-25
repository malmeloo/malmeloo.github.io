fetch("https://api.github.com/users/malmeloo/repos")
  .then((resp) => resp.json())
  .then((data) => {
    const projectNames = data.map((repo) => repo.name);
    Promise.all(
        data.map((repo) => fetch(`https://docs.mikealmel.ooo/${repo.name}/`, {method: "HEAD"}).catch((err) => null))
    ).then((resps) => {
        const docsPages = resps.map((resp, i) => [projectNames[i], resp]).filter((resp) => resp[1] && resp[1].status === 200);

        const elems = document.getElementById("docs");
        elems.innerHTML = '';
        const ul = document.createElement("ul");
        elems.appendChild(ul);
        for (let [name, resp] of docsPages.sort()) {
            const a = document.createElement('a');
            a.text = name;
            a.href = resp.url;
            const li = document.createElement('li');
            li.appendChild(a);

            ul.appendChild(li);
        }
    });
  }
);
