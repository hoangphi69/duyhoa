import { AddIcon } from '@sanity/icons/Add';
import { TrashIcon } from '@sanity/icons/Trash';
import { Box, Button, Flex, Stack, TextArea, TextInput } from '@sanity/ui';
import { randomKey } from '@sanity/util/content';
import { useCallback } from 'react';
import {
  ArrayOfObjectsInputProps,
  insert,
  set,
  setIfMissing,
  unset,
} from 'sanity';

export function QnAInput(props: ArrayOfObjectsInputProps) {
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
    <Stack gap={4}>
      {value.map((item: any, index: number) => (
        <Stack key={item._key || index} gap={2}>
          <Flex align="center" gap={2}>
            <Box flex={1}>
              <TextInput
                value={item.label || ''}
                onChange={(e) =>
                  handleChange(index, 'label', e.currentTarget.value)
                }
                placeholder="Câu hỏi"
              />
            </Box>
            <Box>
              <Button
                icon={TrashIcon}
                mode="ghost"
                tone="critical"
                onClick={() => handleRemove(index)}
                padding={3}
              />
            </Box>
          </Flex>
          <Box flex={2}>
            <TextArea
              value={item.value || ''}
              onChange={(e) =>
                handleChange(index, 'value', e.currentTarget.value)
              }
              placeholder="Trả lời"
              rows={3}
            />
          </Box>
        </Stack>
      ))}
      <Button icon={AddIcon} mode="ghost" text="Thêm FAQ" onClick={handleAdd} />
    </Stack>
  );
}
