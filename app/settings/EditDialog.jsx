import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";

export const EditDialog = ({
  title,
  label,
  placeholder,
  value,
  setValue,
    onBlur,
  buttonText = "确定",
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex flex-col items-center justify-center gap-1">
        <Button>{title}</Button>
      </Dialog.Trigger>
      <Dialog.Content
        style={{ maxWidth: 450, marginLeft: 10, marginRight: 10 }}
      >
        <Dialog.Title>{title}</Dialog.Title>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              {label}
            </Text>
            <TextField.Input
              placeholder={placeholder}
              value={value}
              onBlur={onBlur}
              onChange={(e)=>{setValue(e.target.value)}}
            />
          </label>
        </Flex>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button>{buttonText}</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
