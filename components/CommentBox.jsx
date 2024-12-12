import { Dialog, Button, Flex, TextField, Text } from "@radix-ui/themes";
import { useState } from "react";
export default function CommentBox({ reportEditable, reportExit }) {
  const [comment, setComment] = useState("");
  const handleClick = () => {
    (comment === "edit" || comment === "Edit") ? reportEditable() : reportExit();
  };
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger className="pb-8 flex flex-col items-center justify-center gap-1">
          <div>
            <svg viewBox="0 0 512 512" width={15} height={15}>
              <path d="M144 208c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm112 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm112 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zM256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z"></path>
            </svg>
            <p className="text-[13px] select-none">评论</p>
          </div>
        </Dialog.Trigger>
        <Dialog.Content
          style={{ maxWidth: 450, marginLeft: 10, marginRight: 10 }}
        >
          <Dialog.Title>评论</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            发表评论
          </Dialog.Description>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                评论
              </Text>
              <TextField.Input
                placeholder="输入评论内容"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
            </label>
          </Flex>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                取消
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleClick}>确定</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
