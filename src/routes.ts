import { Router } from 'express';
import { isAuthenticated } from './Middlewares/isAuthenticated';
import multer from 'multer';
import {
    createUserController,
    authUserController,
    logoutController,
    deleteUserController,
    updateUserController,
    changePswController,
    listarUserDadosController,
    uploadMediaController,
    gerarCodPswController,
    verificarCodigoController,
    createClientController,
    listClientController,
    deleteClientController,
    updateClientController,
    createServicesController,
    listServicesController,
    createOrdemServicoController,
    listOrdemServicoController,
    pularEtapaController,
    createConviteController,
    createPecaController,
    entradaPecaController,
    saidaPecaController,
    updatePecaController, 
    listPecaController,
    listUsersController,
    listarLogsPecasController,
    listarPedidoController,
    listarPedidoByIdController,
    atualizarStatusPedidoController

} from './controllers';

const upload = multer();

const initializeRoutes = (): Router => {
    const router = Router();
    
    // User routes
    router.post('/user/cadastrar', createUserController.handle.bind(createUserController));
    router.post('/login', authUserController.handle.bind(authUserController));
    router.delete('/user/delete', isAuthenticated, deleteUserController.handle.bind(deleteUserController));
    router.get('/user/list', isAuthenticated, listUsersController.handle.bind(listUsersController));
    router.put('/user/update/:id', isAuthenticated, updateUserController.handle.bind(updateUserController));
    router.get('/logout', isAuthenticated, logoutController.handle.bind(logoutController));
    router.get('/user/dados', isAuthenticated, listarUserDadosController.handle.bind(listarUserDadosController));
    router.post('/upload-media', upload.single('media'), uploadMediaController.handle.bind(uploadMediaController));
    router.post('/password/codigo', gerarCodPswController.handle.bind(gerarCodPswController));
    router.post('/password/verificar/:userId', verificarCodigoController.handle.bind(verificarCodigoController));
    router.put('/password/change/:id', changePswController.handle.bind(changePswController));
    router.post('/cliente/cadastrar', isAuthenticated, createClientController.handle.bind(createClientController));
    router.get('/cliente/listar', isAuthenticated, listClientController.handle.bind(listClientController));
    router.delete('/cliente/delete/:id', isAuthenticated, deleteClientController.handle.bind(deleteClientController));
    router.put('/cliente/update/:id', isAuthenticated, updateClientController.handle.bind(updateClientController));
    router.post('/servicos/criar', isAuthenticated, createServicesController.handle.bind(createServicesController));
    router.get('/servicos/listar', isAuthenticated, listServicesController.handle.bind(listServicesController));
    router.post('/ordem-servico/criar', isAuthenticated, createOrdemServicoController.handle.bind(createOrdemServicoController));
    router.get('/ordem-servico/listar', isAuthenticated, listOrdemServicoController.handle.bind(listOrdemServicoController));
    router.post('/ordem-servico/etapa', isAuthenticated, pularEtapaController.handle.bind(pularEtapaController));
    router.post('/convite/cadastrar', createConviteController.handle.bind(createConviteController));

    router.post('/peca/cadastrar', createPecaController.handle.bind(createPecaController));
    router.post('/peca/entrada', entradaPecaController.handle.bind(entradaPecaController));
    router.post('/peca/saida', saidaPecaController.handle.bind(saidaPecaController));
    router.get('/peca/listar', listPecaController.handle.bind(listPecaController));
    router.put('/peca/editar', updatePecaController.handle.bind(updatePecaController));

    router.get('/pedido/listar', listarPedidoController.handle.bind(listarPedidoController));
    router.get('/pedido-detalhe/listar/:id', listarPedidoByIdController.handle.bind(listarPedidoByIdController));
    router.get('/logs-pecas/listar', listarLogsPecasController.handle.bind(listarLogsPecasController));
    router.put('/pedido/status', atualizarStatusPedidoController.handle.bind(atualizarStatusPedidoController));

    return router;
};

export const router = initializeRoutes();
