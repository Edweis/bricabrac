import * as WebBrowser from 'expo-web-browser';
import * as MailComposer from 'expo-mail-composer';
import colors from '../../constants/colors';
import { IS_DEV } from '../../firebase';

export const release = IS_DEV
  ? {
      icon: 'ios-bug',
      name: 'Développement',
      description:
        'La base de developpement ne contient pas tous les éléments de la base de production',
    }
  : {
      icon: 'ios-information-circle',
      name: 'Production',
      description: 'Les changements sont sauvegardés sur le serveur officiel.',
    };

export const emailToAuthor = async () =>
  MailComposer.composeAsync({
    recipients: ['kapochamo+app@gmail.com'],
    subject: '[Bric-à-brac] Feedback',
    body: 'Hello Kapochamo,\n\n\n\nMerci et à bientôt,\n ',
  });

export const GITHUB_LINK = 'https://github.com/Edweis/bricabrac/issues';
export const openInWebBrowser = async (url: string) => {
  await WebBrowser.openBrowserAsync(url, {
    toolbarColor: colors.orange,
    controlsColor: colors.white,
  });
};
