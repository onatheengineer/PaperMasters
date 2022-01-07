import React from 'react';
import MenuItem from "../menu-item/menu-item.component";
import './directory.styles.scss';

class Directory extends React.Component {
    constructor() {
        super();

        this.state = {
            sections: [{
                title: 'legitimacyPage',
                image: 'legoLavendarheadercroped.png',
                id: 1,
                size: 'large'
            },
                {
                    title: 'Get Minted',
                    image: 'legoLavendarheadercroped.png',
                    id: 2,
                    size: 'large'
                }
            ]
        };
    }

    render() {
        return (
            <div className='directory-menu'>
                {this.state.sections.map(({title, image, id}) => (
                    <MenuItem key={id} title={title} image={image} size={size}/>
                ))
                }
            </div>
        );
    }
}

export default Directory;
