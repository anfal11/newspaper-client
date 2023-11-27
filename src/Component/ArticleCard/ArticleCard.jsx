
const ArticleCard = ({article}) => {
    const { _id, title, image, publisher, tags, "short-description": shortDescription, "long-description": longDescription} = article;
    return (
        <div>
                {_id}
                {title}
        </div>
    );
};

export default ArticleCard;