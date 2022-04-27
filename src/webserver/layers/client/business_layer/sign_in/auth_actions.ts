import * as Requests from '../../http/requests_client';
import * as Constants from '../../../common/environment/constants';


// @ts-ignore
import React from 'react';
import { isEmpty } from "../../../common/utils/string_helper";

import * as LocalStorage from '../../hooks/local_storage_hook'

import { log_debug, log_error, log_exception, log_info, log_warn } from "../../../common/logger/logger";
import { IHttpResponse } from "../../../common/infra/http/IHttpResponse";


export async function signInOrRegister(
    email: string | undefined,
    password: string | undefined):
    Promise<IHttpResponse >
{
   let resp: IHttpResponse = { error: 'something went wrong', token: null, data: null, success:false };

    // @ts-ignore
    //const authState = useAuthState();
    if (!email || !password) {
        return { error: 'email/password not valid', token: null , data: null, success : false};
    };



    await Requests.post(
        'use_case/sign_in/sign_in_or_register',
        { email: email, password: password },
    ).then((response:IHttpResponse) => {

      if (response.success && isEmpty(response.error)) {

        if (!isEmpty(response.token)) {

          try{
            LocalStorage.setItem(Constants.SESSION_KEY, response.token ||'');
            log_info(`user token was set`, response.token);
          }
          catch(err:any){

            log_exception(`user token was NOT set`,err);
          };

          resp = { token: response.token , error: null, data : null, success:true};

          return resp;

        } else
        {

          log_info('sign in/register failed - token was empty');

          resp = {
            error: 'sign_in_or_register failed - token was empty',
            token: null,
            data:null,
            success:false
          };

          return resp;
        };

      } else {
        log_error(`token response was empty/received with error ${response.error}`);
        return <IHttpResponse> { error: response.error, token: null , data: null, success:false};
      }
    });

    return resp;
}


export const deleteUser: ()=> Promise<IHttpResponse> = async () => {

  let resp: IHttpResponse = { error: 'something went wrong',
                              token: null,
                              data: null,
                              success:false };

  await Requests.del(
    'use_case/sign_in/delete_user',
  ).then((response:IHttpResponse) =>
  {
    if (response.success && isEmpty(response.error)) {

      log_info(`user deleted successfully`, response.token);


      resp = {  token: null ,
                error: null,
                data : null,
                success:true};

      return resp;

    }
    else
    {
      log_error(`user deleting failed - ${response.error}`);

      resp = {  token: null ,
                error: ` delete user failed - ${response.error}`,
                data : null,
                success:false};


      return resp;
    }
  });

return resp;


};

export const signOut: ()=> Promise<boolean>  = async () => {

    log_debug('start sign out user');

        const jwt = LocalStorage.getItem(Constants.SESSION_KEY) ||'';


        if (jwt) {
          log_info('sign out user with token', jwt);
          return true;

        } else {
          log_warn('cookie already removed');
          return false;

        }

      return false;

};




