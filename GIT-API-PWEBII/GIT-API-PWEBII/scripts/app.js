

const getUsers = (username) => {
    const url = `https://api.github.com/users/${username}`;

    fetch(url)
        .then(response => response.json())
        .then(user => {
            console.log(user);

            const blockImg = document.querySelector('#aqui'); 
            const image = document.createElement('img');
            image.src = user.avatar_url;
            blockImg.appendChild(image);

            const blockInfoBasicas = document.querySelector('#nome');
            blockInfoBasicas.textContent = `${user.name}`;

            const blockInfoBasicasU = document.querySelector('#login');
            blockInfoBasicasU.textContent = `${user.login}`;

            const blockInfoBio = document.querySelector('#bio');
            blockInfoBio.textContent = `${user.bio}`;

            const blockInfofollowers = document.querySelector('#followers');
            blockInfofollowers.textContent = `${user.followers}`;

            const blockInfofollowing = document.querySelector('#following');
            blockInfofollowing.textContent = `${user.following}`;

            const blockInfoRepo = document.querySelector('#info-repo');
            blockInfoRepo.textContent = `${user.public_repos}`;

            const githubLink = document.querySelector("#github-link");
            githubLink.href = user.html_url;

            const blockTBlog = document.querySelector("#blog-link");
            blockTBlog.href = user.blog;
            

            const btnRepo = document.querySelector("#mostrar-repositorio");
            btnRepo.addEventListener("click", () => {
                showRepoModal();
                loadLatestRepoDetails(username, false);
            });

        })
        .catch(error => console.log(error));
};


const loadLatestRepoDetails = (username, showModal) => {
    const repoUrl = `https://api.github.com/users/${username}/repos`;
    fetch(repoUrl)
        .then(response => response.json())
        .then(repos => {
            const latestRepo = repos[0];

            const blockRepo = document.querySelector('#repoDetailsModal');
            blockRepo.innerHTML = `
                <h3>Repositório Mais Recente</h3>
                <p><strong>Nome:</strong> ${latestRepo.name}</p>
                <p><strong>Descrição:</strong> ${latestRepo.description || "Não a descrição"}</p>
                <p><strong>URL:</strong> <a href="${latestRepo.html_url}" target="_blank">${latestRepo.html_url}</a></p>
            `;

            if (showModal) {
                showRepoModal();
            }
        })
        .catch(error => console.error('Erro ao carregar repositórios:', error));
};

const showRepoModal = () => {
    const modal = document.getElementById('repoModal');
    modal.style.display = 'block';
};

const closeRepoModal = () => {
    const modal = document.getElementById('repoModal');
    modal.style.display = 'none';
};

const btnUsers = document.querySelector("#mostrar-usuarios");
btnUsers.addEventListener("click", () => {
    const username = document.querySelector("#nome-usuario").value;
    getUsers(username);
});

const btnRepo = document.querySelector("#mostrar-repositorio");
btnRepo.addEventListener("click", () => {
    const username = document.querySelector("#nome-usuario").value;
    loadLatestRepoDetails(username, true);
});
