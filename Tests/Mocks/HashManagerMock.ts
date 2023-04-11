export class HashManagerMock {
    public hash = async (plaintext: string): Promise<string> => {
        if (plaintext == "senha@123") {
            return "hash-senha@123"
        }

        return "hash-mock"
    }

    public compare = async (plaintext: string, hash: string): Promise<boolean> => {
        if (plaintext == "senha@123" && hash == "hash-senha@123") {
            return true
        }

        return false
    }
}