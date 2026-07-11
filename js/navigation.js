const page = location.pathname.split("/").pop();

const nav = `
<nav class="bottom-nav">

<a href="index.html" ${page=="dashboard.html"?'class="active"':""}>
<i>🏠</i>
<span>Home</span>
</a>

<a href="bet.html" ${page=="bet.html"?'class="active"':""}>
<i>🎯</i>
<span>Bet</span>
</a>

<a href="results.html" ${page=="result.html"?'class="active"':""}>
<i>🏆</i>
<span>Results</span>
</a>

<a href="history.html" ${page=="history.html"?'class="active"':""}>
<i>📜</i>
<span>History</span>
</a>

<a href="profile.html" ${page=="profile.html"?'class="active"':""}>
<i>👤</i>
<span>Profile</span>
</a>

</nav>
`;

document.body.insertAdjacentHTML("beforeend", nav);
