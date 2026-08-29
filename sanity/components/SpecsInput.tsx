import { AddIcon } from '@sanity/icons/Add';
import { TrashIcon } from '@sanity/icons/Trash';
import { Box, Button, Flex, Stack, TextInput } from '@sanity/ui';
import { randomKey } from '@sanity/util/content';
import { useCallback } from 'react';
import {
  ArrayOfObjectsInputProps,
  insert,
  set,
  setIfMissing,
  unset,
} from 'sanity';

export function SpecsInput(props: ArrayOfObjectsInputProps) {
  const { value = [], onChange } = props;

  const handleAdd = useCallback(() => {
    const newItem = { _key: randomKey(), label: '', value: '' };
    onChange([setIfMissing([]), insert([newItem], 'after', [-1])]);
  }, [onChange]);

  const handleRemove = useCallback(
    (index: number) => {
      onChange([unset([index])]);
    },
    [onChange],
  );

  const handleChange = useCallback(
    (index: number, field: 'label' | 'value', newValue: string) => {
      onChange([setIfMissing([]), set(newValue, [index, field])]);
    },
    [onChange],
  );

  return (
    <Stack gap={3}>
      {value.map((item: any, index: number) => (
        <Flex key={item._key || index} gap={3} align="center">
          <Box flex={1}>
            <TextInput
              value={item.label || ''}
              onChange={(e) =>
                handleChange(index, 'label', e.currentTarget.value)
              }
              placeholder="Thông số"
            />
          </Box>
          <Box flex={2}>
            <TextInput
              value={item.value || ''}
              onChange={(e) =>
                handleChange(index, 'value', e.currentTarget.value)
              }
              placeholder="Giá trị"
            />
          </Box>
          <Box>
            <Button
              icon={TrashIcon}
              mode="ghost"
              tone="critical"
              onClick={() => handleRemove(index)}
              padding={2}
            />
          </Box>
        </Flex>
      ))}
      <Button
        icon={AddIcon}
        mode="ghost"
        text="Thêm thông số"
        onClick={handleAdd}
      />
    </Stack>
  );
}
