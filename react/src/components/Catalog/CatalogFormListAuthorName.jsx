import React from 'react';

const CatalogFormListAuthorName = ({author}) => {
    return (
        <span>
             {author.second_name && author.second_name + ' '}
            {author.second_name && author.first_name ? author.first_name && author.first_name[0] + '.' :
                author.first_name && author.first_name + ' '}
            {author.middle_name && author.middle_name[0] + '.'}
        </span>
    );
};

export default CatalogFormListAuthorName;
