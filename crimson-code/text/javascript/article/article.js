export let Article = {
    article: [],
    sub_articles: [],
    add_sub_article: function(index, sub_article) {
        this.sub_articles.splice(index, 0, sub_article);
    },
    remove_sub_article: function(index) {
        return this.sub_articles.splice(index, 1);
    },
}