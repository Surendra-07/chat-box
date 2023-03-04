import React, { useCallback, useState } from 'react';
import { Alert, Icon, Input, InputGroup } from 'rsuite';

const EditableInput = ({
  initialvalue,
  onSave,
  placeholder,
  label,
  ...inputProps
}) => {
  const [input, setInput] = useState(initialvalue);
  const [isEditable, setIsEditable] = useState(false);
  const onInputChange = useCallback(value => {
    setInput(value);
  }, []);

  const onEditClick = useCallback(() => {
    setIsEditable(p => !p);
    setInput(initialvalue);
  }, [initialvalue]);

  const onSaveClick = () => {
    const trimmed = input.trim();
    if (trimmed === '') {
      Alert.info('input is empty', 4000);
    }

    if (trimmed !== initialvalue) {
      onSave(trimmed);
    }
    setIsEditable(false);
  };

  return (
    <div>
      {label}{' '}
      <InputGroup.Button>
        <Input
          value={input}
          disabled={!isEditable}
          placeholder={placeholder}
          onChange={onInputChange}
        />
        <InputGroup.Button onClick={onEditClick}>
          <Icon icon={isEditable ? 'close' : 'edit2'} />
        </InputGroup.Button>
        {isEditable && (
          <InputGroup.Button onClick={onSaveClick}>
            <Icon icon="check" />
          </InputGroup.Button>
        )}
      </InputGroup.Button>
    </div>
  );
};

export default EditableInput;
