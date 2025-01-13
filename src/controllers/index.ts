import { CreateUserController } from './users/CreateUserController';
import { AuthUserController } from './users/AuthUserController';
import { LogoutController } from './users/LogoutController';
import { DeleteUserController } from './users/DeleteUserController';
import { UpdateUserController } from './users/UpdateUserController';
import { ChangePswController } from './users/ChangePswController';
import { ListarUserDadosController } from './users/ListarUserDadosController';
import { UploadMediaController } from './media/UploadMediaController';
import { GerarCodPswController } from './users/GerarCodPswController';
import { VerificarCodigoController } from './users/VerificarCodigoController';
import { CreateClientController } from './cliente/CreateClientController';
import { ListClientController } from './cliente/ListClientController';
import { DeleteClientController } from './cliente/DeleteClientController';
import { UpdateClientController } from './cliente/UpdateClientController';
import { CreateServicesController } from './servicos/CreateServicesController';
import { ListServicesController } from './servicos/ListServicesController';



import { CreateUserService } from '../services/users/CreateUserService';
import { AuthUserService } from '../services/users/AuthUserService';
import { LogoutService } from '../services/users/LogoutService';
import { DeleteUserService } from '../services/users/DeleteUserService';
import { UpdateUserService } from '../services/users/UpdateUserService';
import { ChangePswService } from '../services/users/ChangePswService';
import { ListarUserDadosService } from '../services/users/ListarUserDadosService';
import { UploadMediaService } from '../services/media/UploadMediaService';
import { GerarCodPswService } from '../services/users/GerarCodPswService';
import { VerificarCodigoService } from '../services/users/VerificarCodigoService';
import { CreateClientService } from '../services/cliente/CreateClientService';
import { ListClientService } from '../services/cliente/ListClientService';
import { DeleteClientService } from '../services/cliente/DeleteClientService';
import { UpdateClientService } from '../services/cliente/UpdateClientService';
import { CreateServicesService } from '../services/servicos/CreateServicesService'; 
import { ListServicesService } from '../services/servicos/ListServicesService';



const createUserService = new CreateUserService();
const authUserService = new AuthUserService();
const logoutService = new LogoutService();
const deleteUserService = new DeleteUserService();
const updateUserService = new UpdateUserService();
const changePswService = new ChangePswService();
const listarUserDadosService = new ListarUserDadosService();
const uploadMediaService = new UploadMediaService();
const gerarCodPswService = new GerarCodPswService();
const verificarCodigoService = new VerificarCodigoService();
const createClientService = new CreateClientService();
const listClientService = new ListClientService();
const deleteClientService = new DeleteClientService();
const updateClientService = new UpdateClientService();
const createServicesService = new CreateServicesService();
const listServicesService = new ListServicesService();



export const createUserController = new CreateUserController(createUserService);
export const authUserController = new AuthUserController(authUserService);
export const logoutController = new LogoutController(logoutService);
export const deleteUserController = new DeleteUserController(deleteUserService);
export const updateUserController = new UpdateUserController(updateUserService);
export const changePswController = new ChangePswController(changePswService);
export const listarUserDadosController = new ListarUserDadosController(listarUserDadosService);
export const uploadMediaController = new UploadMediaController(uploadMediaService);
export const gerarCodPswController = new GerarCodPswController(gerarCodPswService);
export const verificarCodigoController = new VerificarCodigoController(verificarCodigoService);
export const createClientController = new CreateClientController(createClientService);
export const listClientController = new ListClientController(listClientService);
export const deleteClientController = new DeleteClientController(deleteClientService);
export const updateClientController = new UpdateClientController(updateClientService);
export const createServicesController = new CreateServicesController(createServicesService);
export const listServicesController = new ListServicesController(listServicesService);