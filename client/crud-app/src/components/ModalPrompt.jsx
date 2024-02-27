import {
          Modal,
          ModalOverlay,
          ModalContent,
          ModalHeader,
          ModalFooter,
          ModalBody,
          ModalCloseButton,
        } from '@chakra-ui/react'


        function ModalPrompt({msg,openModal}) {
          openModal = isOpen
          const { isOpen, onOpen, onClose } = useDisclosure()
          return (
            <>
              <Button onClick={openModal}>Open Modal</Button>
        
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Modal Title</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                   Are you sure u want to {msg}
                  </ModalBody>
        
                  <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button variant='ghost'>Yes</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          )
        }

        export default ModalPrompt