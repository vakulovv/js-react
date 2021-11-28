import React from 'react';
import Select from 'react-select';
import { VariableSizeList as List } from 'react-window';

const GROUP_HEADER_HEIGHT = 13;
const ITEM_HEIGHT = 34;

function MenuList (props) {
    const { options, getValue } = props;
    const [ value ] = getValue();

    const initialOffset = options.indexOf(value) * ITEM_HEIGHT;

    const children = React.Children.toArray(props.children);

    function getOptionSize (option) {
        if (option.options) {
            return option.options.length * ITEM_HEIGHT + GROUP_HEADER_HEIGHT;
        }
        return ITEM_HEIGHT;
    }

    function getItemSize (i) {
        return getOptionSize(options[i]);
    }

    const totalHeight = options.reduce((height, option) => {
        return height + getOptionSize(option);
    }, 0);

    const estimatedItemSize = totalHeight / options.length;

    return (
        <List
            height={Math.min(totalHeight, 300)}
            itemCount={children.length}
            itemSize={getItemSize}
            estimatedItemSize={estimatedItemSize}
            initialScrollOffset={initialOffset}
        >
            {({ index, style }) => <div style={style}>{children[index]}</div>}
        </List>
    );
}

export default MenuList;