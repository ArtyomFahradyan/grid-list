import React, {useState} from 'react';
import './styles.scss';

function Column({ list, setList, title, setSecondaryList, secondaryList }) {
    const [newItemValue, setNewItemValue] = useState('')

    const handleEditItem = (e, idx) => {
        let isRepeated = false;

        setSecondaryList(
            secondaryList.map((elem) => {
                const repeated = e.target.value === elem.value;
                if (repeated) {
                    isRepeated = true;
                }
                return { ...elem, repeated };
            })
        );

        setList(list.map((item, index) => idx === index ? { ...item, value: e.target.value, repeated: isRepeated } : item));
    };
    const handleEdit = (idx) => {
        setList(list.map((item, index) => idx === index ? { ...item, edit: true } : item));
        setTimeout(() => {
            document.getElementById('input' + idx)?.focus();
        }, 100);
    };
    const handleNewItemOnChange = (e) => {
        setNewItemValue(e.target.value);
    };
    const handleEditOnBlur = (e, idx) => {
        if (!e.target.value) {
            setList(list.filter((_, index) => index !== idx));
        } else {
            setList(list.map((item, index) => idx === index ? { ...item, value: e.target.value, edit: false } : item));
        }
    };
    const handleSubmit = (e) => {
        if (e.key === 'Enter' && newItemValue) {
            setList([...list, { value: newItemValue, edit: false, repeated: false }]);
            setNewItemValue('');
        }
    };
    // const handleBlur = (e) => {
    //     setList([...list, { value: newItemValue, edit: false }]);
    // };

    return (
        <div className="column">
            <div className="title">{title}</div>
            {list.map((item, idx) => {
                return (
                    <div className="column-item" key={idx}>
                        {item?.edit ?
                            <input
                                style={{ color: item.repeated ? 'red' : 'black' }}
                                onBlur={(e) => handleEditOnBlur(e, idx)}
                                id={'input' + idx}
                                type="text"
                                value={item.value}
                                onChange={(e) => handleEditItem(e, idx)}
                            /> :
                            <div
                                style={{ color: item.repeated ? 'red' : 'black' }}
                                onClick={() => handleEdit(idx)}>{item?.value}
                            </div>
                        }
                    </div>
                )
            })}
            <div className="main-input">
                <input
                    type="text"
                    value={newItemValue}
                    onChange={handleNewItemOnChange}
                    onKeyDown={handleSubmit}
                    // onBlur={handleBlur}
                />
            </div>
        </div>
    )
}

export default Column;