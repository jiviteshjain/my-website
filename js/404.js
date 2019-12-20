function _getEditDistance(a, b, i, j, dp) {
    
    if (i < 0) {
        return j + 1;
    }
    
    if (j < 0) {
        return i + 1;
    }
    
    if (dp[i][j] != -1) {
        return dp[i][j];
    }

    let one = _getEditDistance(a, b, i - 1, j, dp) + 1;
    let two = _getEditDistance(a, b, i, j - 1, dp) + 1;
    let three = _getEditDistance(a, b, i - 1, j - 1, dp);
    if (a[i] != b[j]) {
        three++;
    }

    dp[i][j] = Math.min(one, two, three);
    return dp[i][j];

}

function getEditDistance(a, b) {
    let n = a.length;
    let m = b.length;

    if (n == 0) {
        return m;
    }

    if (m == 0) {
        return n;
    }

    let dp = [];
    for (let i = 0; i < n; i++) {
        dp[i] = [];
        for (let j = 0; j < m; j++) {
            dp[i][j] = -1;
        }
    }
    return _getEditDistance(a, b, n - 1, m - 1, dp);
}

function compare(a, b) {
    return getEditDistance(a, currenturl) - getEditDistance(b, currenturl);
}

const baseurl = "https://jiviteshjain.github.io";

var links = [
    "/web/html/index.html",
    "/web/html/strengths.html",
    "/web/resume-jiviteshjain.pdf"
];

var currenturl= window.location.pathname;

window.onload = function () {

    links.sort(compare)

    let para = this.document.getElementById("content-urls-404");
    para.innerHTML = ""
    for (link of links) {
        para.innerHTML = para.innerHTML + "<a href='" + baseurl + link + "'>" + link + "</a><br>"
    }
}




