import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
    saltOrRounds = 10

    async encrypt(textToEncrypt: string) {
        const hash = await bcrypt.hash(textToEncrypt, this.saltOrRounds);
        return hash;
    }

    async hashIsEqualToText(hash: string, text: string) {
        const isMatch = await bcrypt.compare(text, hash);
        return isMatch;
    }
}
