import {
  Handshake,
  House,
  Search,
  Settings,
  User,
  Send,
  MonitorCog,
  Pencil,
  Trash2,
  Plus,
  CircleChevronLeft,
  CircleX,
  Paperclip,
  UserRoundPlus,
  Check,
  Eye,
  EyeOff 
} from "lucide-react";

// Mapeia o slug da tela com o ícone correspondente.
const iconsMap: { [key: string]: React.ElementType } = {
  home: House,
  Check,
  Eye,
  EyeOff,
  "gerenciar-sistema": Settings,
  settings: Settings,
  CircleX: CircleX,
  "help-desk": Handshake,
  "usuarios-do-sistema": User,
  users: User,
  "parametros-do-sistema": MonitorCog,
  search: Search,
  sendMessage: Send,
  editBtn: Pencil,
  delete: Trash2,
  add: Plus,
  voltar: CircleChevronLeft,
  //gerenciar usuarios
  "configuracao": Handshake,
  Paperclip: Paperclip,
  UserRoundPlus: UserRoundPlus,

  // Adicione outros mapeamentos conforme necessário
};

export default iconsMap;
