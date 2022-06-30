<template>
  <div class="page-endpoints">
    <v-container class="main-container">
      <v-row>
        <v-col cols="12">
          <v-card tile>
            <v-card-title>
              Registries
            </v-card-title>
            <v-divider />
            <v-card-text style="padding: 0">
              <v-data-table
                :headers="headers"
                :items="registries"
                item-key="id"
              >
                <template #item.index="{ item, index }">
                  {{ index + 1 }}
                </template>
                <template #item.actions="{ item }">
                  <v-menu>
                    <template v-slot:activator="{ on: menu }">
                      <v-btn icon v-on="onTooltip({ ...menu })">
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list class="pa-0" dense>
                      <v-list-item
                        @click="$router.push('/registries/' + item.id)">
                        <v-list-item-icon class="mr-2">
                          <v-icon small>mdi-pencil</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Edit</v-list-item-title>
                      </v-list-item>
                      <v-list-item v-if="item.type === 0">
                        <v-list-item-icon class="mr-2">
                          <v-icon small>mdi-close</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Delete</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TooltipMixin from '@/mixins/Tooltip';

@Component({
  mixins: [TooltipMixin]
})
export default class RegistriesView extends Vue {
  registries = this?.$route?.meta?.registries;

  headers = [
    {
      text: '#',
      value: 'index',
      sortable: false
    },
    {
      text: 'Name',
      value: 'name',
      sortable: false
    },
    {
      text: 'Type',
      value: 'type',
      sortable: false
    },
    {
      text: 'Actions',
      value: 'actions',
      sortable: false
    }
  ]
}
</script>
