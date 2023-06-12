import React, {useState} from 'react';
import Star from "./Star.jsx";

const Stars = ({callback}) => {
    //Статусы окрашивания
    const [painted, setPainted] = useState(
        [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false
        ]
    );
    //Функция окрашивания
    const painting = (id, status) => {
        if (status) {
            const temporaryArray = [];
            for (let i = 0; i < id; i++) {
                temporaryArray.push(true);
            }
            for (let i = 0; i < 10 - (id + 1); i++) {
                temporaryArray.push(false);
            }
            setPainted([...temporaryArray]);
        } else {
            setPainted([
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false
            ]);
        }
    }
    return (
        <div className='rating-star-bar'>
            <Star id={1} painting={painting} painted={painted[0]} clicked={callback}/>
            <Star id={2} painting={painting} painted={painted[1]} clicked={callback}/>
            <Star id={3} painting={painting} painted={painted[2]} clicked={callback}/>
            <Star id={4} painting={painting} painted={painted[3]} clicked={callback}/>
            <Star id={5} painting={painting} painted={painted[4]} clicked={callback}/>
            <Star id={6} painting={painting} painted={painted[5]} clicked={callback}/>
            <Star id={7} painting={painting} painted={painted[6]} clicked={callback}/>
            <Star id={8} painting={painting} painted={painted[7]} clicked={callback}/>
            <Star id={9} painting={painting} painted={painted[8]} clicked={callback}/>
            <Star id={10} painting={painting} painted={painted[9]} clicked={callback}/>
        </div>
    );
};

export default Stars;
