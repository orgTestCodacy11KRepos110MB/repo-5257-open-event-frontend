import Route from '@ember/routing/route';
import { action } from '@ember/object';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default class extends Route.extend(EmberTableRouteMixin, AuthenticatedRouteMixin) {
  titleToken() {
    return this.l10n.t('Groups');
  }

  async model(params) {
    this.set('params', params);
    const filterOptions = [];
    return this.infinity.model('groups', {
      include      : 'follower,user,events',
      filter       : filterOptions,
      perPage      : 10,
      startingPage : 1,
      perPageParam : 'page[size]',
      pageParam    : 'page[number]',
      store        : this.authManager.currentUser
    });
  }

  @action
  refreshRoute() {
    this.refresh();
  }
}
