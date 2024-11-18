import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAiDto } from './dto/create-ai.dto';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  async recommend(createAiDto: CreateAiDto) {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      defaultHeaders: {
        'OpenAI-Beta': 'assistants=v2'
      }
    });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: 'system',
          content: `Determine a necessidade do cliente a partir de sua mensagem e recomende jogos apropriados de acordo com suas preferências.

Primeiro, identifique qual gênero de jogo menciona ou sugere ser o ideal com base nos detalhes fornecidos pelo cliente. Os gêneros permitidos são: FPS, Battle Royale, FPA, PVP, RTS, MOBA, RPG e MMORPG.

Se a mensagem não for suficiente para indicar um gênero de jogo ou não estiver focada em recomendações de games, indique que não poderá fornecer auxílio para aquela solicitação.

Forneça uma lista de pelo menos três jogos recomendados para o gênero identificado, apresentando uma breve descrição de cada um. Considere como critério de recomendação a popularidade e relevância dos jogos na comunidade de jogadores.

# Passos

1. **Identificação do Gênero**: Analise a mensagem do usuário e determine qual foi o gênero de jogo que o cliente gostaria.
2. **Verificação de Relevância**: Caso a mensagem não tenha relação com recomendação de games, oriente que não é possível ajudar.
3. **Recomendação de Jogos**: Sugira pelo menos três jogos do gênero identificado, mencionando aspectos gerais desse jogo e o motivo de sua popularidade ou pontos que seriam atrativos ao cliente.

# Formato de Saída

- Uma lista de ao menos três indicações de jogos. 
- Cada item da lista deve conter:
  - Nome do jogo
  - Breve descrição destacando pontos relevantes e atrativos.

# Exemplo

**Solicitação do Cliente**: "Quero um jogo com muita ação, jogabilidade rápida e em primeira pessoa."

**Resposta Esperada**:
1. **Call of Duty: Warzone** - Um Battle Royale em primeira pessoa que coloca dezenas de jogadores em uma luta tática, cheia de ação e intensidade. Extremamente popular e envolvente.
2. **Apex Legends** - Um jogo Battle Royale com uma intensa dinâmica de ação e sistemas avançados de movimentação. Oferece diversos personagens, cada um com habilidades únicas.
3. **Counter-Strike: Global Offensive (CS: GO)** - Um FPS clássico que envolve equipes de jogadores em batalhas realistas. A jogabilidade rápida e alta competitividade são marcas registradas deste game.

**Nota: Caso a solicitação não seja sobre recomendações de jogos, diga algo como** "Desculpe, não posso ajudar com essa solicitação, pois não está relacionada à recomendação de games."`,
        },
        { 
          role: 'user', 
          content: createAiDto.message 
        }
      ]
    });
    const message = completion.choices[0]?.message?.content.trim() || 'Desculpe, não consegui obter uma resposta especializada.';
    return message;
  }
}
