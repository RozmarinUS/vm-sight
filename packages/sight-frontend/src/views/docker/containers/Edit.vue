<template>
  <v-row>
    <v-col :cols="12">
      <v-card>
        <v-progress-linear indeterminate color="primary" v-if="idle" absolute top/>
        <v-card-subtitle class="font-weight-medium" style="color: #333;background: #f6f6f6">
          <i class="fa fa-cogs"></i>
          <span class="font-weight-medium pl-1" style="color: #333">Actions</span>
        </v-card-subtitle>
        <v-divider/>
        <v-card-text>
          <ContainerActionMenu @onUpdate="refreshContainer" :selected="[container]"/>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col :cols="12">
      <v-card>
        <v-card-subtitle class="font-weight-medium" style="color: #333;background: #f6f6f6">
          <i class="fa fa-server"></i>
          <span class="font-weight-medium pl-1" style="color: #333">
            Container status
          </span>
        </v-card-subtitle>
        <v-divider/>
        <v-card-text style="padding: 0">
          <v-simple-table dense>
            <template v-slot:default>
              <tbody>
              <tr>
                <td style="width: 25%">
                  ID
                </td>
                <td v-text="container.Id"></td>
              </tr>
              <tr>
                <td style="width: 25%">
                  Name
                </td>
                <td>
                  {{ container.Name.substr(1) }}
                  <v-btn style="margin-left: 0.3em" icon>
                    <v-icon color="primary" small>
                      fa-edit
                    </v-icon>
                    <v-dialog width="500" v-model="dialog.rename.show">
                      <v-card>
                        <v-card-title>Change name of container</v-card-title>
                        <v-divider></v-divider>

                        <v-card-text>
                          <v-text-field v-model="dialog.rename.name" style="margin-top: 1.5em" filled label="Name"/>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="primary" text @click="dialog.rename.show = false">
                            Close
                          </v-btn>
                          <v-btn color="primary">Rename</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-btn>
                </td>
              </tr>
              <tr>
                <td style="width: 25%">Status</td>
                <td>
                  <State :text="true" :state="container.State.Status"/>
                </td>
              </tr>
              <tr>
                <td style="width: 25%">Created</td>
                <td> {{ container.Created | moment("YYYY-MM-DD HH:mm:ss") }}</td>
              </tr>
              <tr style="width: 25%">
                <td>Finished</td>
                <td> {{ container.State.FinishedAt | moment("YYYY-MM-DD HH:mm:ss") }}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-divider/>
        <v-card-actions style="padding: 1em">
          <v-btn text v-text="this.t('endpoints.logs')" @click="$router.push(`${container.Id}/logs`)"/>
          <v-btn text class="space-left" v-text="this.t('endpoints.inspect')"/>
          <v-btn text class="space-left" v-text="this.t('endpoints.stats')"/>
          <v-btn text class="space-left" v-text="this.t('endpoints.console')"
                 @click="$router.push(`${container.Id}/exec`)"/>
          <v-btn text class="space-left" v-text="this.t('endpoints.attach')"
                 @click="$router.push(`${container.Id}/attach`)"/>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col :cols="12">
      <v-card>
        <v-card-subtitle class="font-weight-medium" style="color: #333;background: #f6f6f6">
          <i class="fa fa-server"></i>
          <span class="font-weight-medium pl-1" style="color: #333">
            Container details
          </span>
        </v-card-subtitle>
        <v-divider/>
        <v-card-text style="padding: 0">
          <v-simple-table dense>
            <template v-slot:default>
              <tbody>
              <tr>
                <td style="width: 25%">
                  IMAGE
                </td>
                <td>{{ container.Image }}</td>
              </tr>
              <tr v-if="container.NetworkSettings.Ports !== {}">
                <td style="width: 25%">
                  Port Configuration
                </td>
                <td>
                  <template v-for="ports in container.NetworkSettings.Ports">
                    <template v-for="(port, portKey) in ports">
                      <span :key="portKey">
                        {{ port.HostIp }}:{{ port.HostPort }}
                        <br/>
                      </span>
                    </template>
                  </template>
                </td>
              </tr>
              <tr>
                <td style="width: 25%">CMD</td>
                <td><span class="code" v-if="container.Config.Cmd" v-text="container.Config.Cmd.join(' ')"/></td>
              </tr>
              <tr>
                <td style="width: 25%">
                  ENTRYPOINT
                </td>
                <td><span class="code" v-if="container.Config.Entrypoint"
                          v-text="container.Config.Entrypoint.join('')"/></td>
              </tr>
              <tr>
                <td style="width: 25%">
                  Restart Policy
                </td>
                <td>
                  <div style="display: flex;padding-top: 1em">
                    <div style="width: 25%">
                      <v-select
                        dense
                        v-model="container.HostConfig.RestartPolicy.Name"
                        :value="container.HostConfig.RestartPolicy.Name"
                        :items="restartPolicyItems"
                        item-text="text"
                        item-value="Name"/>
                    </div>
                    <v-btn @click="update({
                          RestartPolicy: {
                            Name: container.HostConfig.RestartPolicy.Name,
                            MaximumRetryCount: container.HostConfig.RestartPolicy.MaximumRetryCount
                          }}, 'restartPolicy')" style="margin-left: 2em" color="primary">
                      Update
                    </v-btn>
                  </div>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col :cols="12" v-if="container && container.Mounts.length > 0">
      <v-card>
        <v-card-subtitle class="font-weight-medium" style="color: #333;background: #f6f6f6">
          <i class="fa fa-hdd"></i>
          <span class="font-weight-medium pl-1" style="color: #333">
            Volumes
          </span>
        </v-card-subtitle>
        <v-divider/>
        <v-card-text style="padding: 0">
          <v-simple-table dense>
            <thead>
            <tr>
              <th><span class="font-weight-black" style="font-size: 1.2em">Host/Volume</span></th>
              <th><span class="font-weight-black" style="font-size: 1.2em">Path in container</span></th>
            </tr>
            </thead>
            <tbody>
            <tr :key="volume.Source" v-for="volume in container.Mounts">
              <td v-text="volume.Name" v-if="volume.Name"/>
              <td v-text="volume.Source" v-else/>
              <td v-text="volume.Destination"/>
            </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col :cols="12" v-if="container">
      <v-card>
        <v-card-subtitle class="font-weight-medium">
          <i class="fa fa-sitemap"></i>
          <span class="font-weight-medium pl-1" style="color: #333">
            Connected networks
          </span>
        </v-card-subtitle>
        <v-divider/>
        <v-card-subtitle>
          <div style="display: flex">
            <v-select style="max-width: 20%" v-model="currentNetwork" :items="networks" outlined item-text="Name"
                      item-value="Id" dense/>
            <v-btn color="primary" class="space-left"
                   @click="connectNetwork(currentNetwork)"
                   :disabled="currentNetwork === ''">
              Join
            </v-btn>
          </div>
        </v-card-subtitle>
        <v-divider/>
        <v-card-text style="padding: 0;margin-bottom: 6em">
          <v-simple-table class="font-weight-medium">
            <thead>
            <tr>
              <th>Network</th>
              <th>IP Address</th>
              <th>IP Gateway</th>
              <th>MAC</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr :key="key" v-for="(network, key) in container.NetworkSettings.Networks">
              <td>{{ key }}</td>
              <td>{{ network.IPAddress }}</td>
              <td>{{ network.Gateway }}</td>
              <td>{{ network.MacAddress }}</td>
              <td>
                <v-btn @click="disconnectNetwork(network.NetworkID)" large icon color="error">
                  <v-icon class="space-right">fa-trash</v-icon>
                </v-btn>
              </td>
            </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-col>

  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ContainerActionMenu from '@/components/docker/action-menu/ContainerActionMenu.vue';
import dockerService from '@/services/docker.service';
import State from '@/components/docker/State.vue';
import { AxiosError } from 'axios';
import Dockerode from 'dockerode';

@Component({
  components: { State, ContainerActionMenu }
})
export default class DockerContainersEditView extends Vue {
  endpoint = this.$route.meta?.endpoint;
  container: Dockerode.ContainerInspectInfo = this.$route.meta?.container;
  networks: Dockerode.NetworkInspectInfo = this.$route.meta?.networks;
  idle = false;
  restartPolicyItems = [
    {
      text: 'None',
      Name: 'no'
    },
    {
      text: 'On Failure',
      Name: 'on-failure'
    },
    {
      text: 'Always',
      Name: 'always'
    },
    {
      text: 'Unless Stopped',
      Name: 'unless-stopped'
    }
  ];

  dialog = {
    rename: {
      show: false,
      name: ''
    }
  }

  currentNetwork = ''

  networkHeaders = [
    {
      text: 'Network',
      value: 'Network'
    },
    {
      text: 'IPAddress',
      value: 'IPAddress'
    },
    {}
  ];

  async refreshContainer () {
    this.container = await dockerService.getContainerById(this.$route.params.endpointId, this.$route.params.id);
  }

  async update (data: object, type: 'restartPolicy' | null = null) {
    try {
      await dockerService.updateContainer(this.$route.params.endpointId, this.$route.params.id, data);
      if (type === 'restartPolicy') {
        this.$toast.success('The restart policy has been updated');
      }
    } catch (err) {
      this.$toast.error('An error occurred');
    }
  }

  async connectNetwork (networkId: string) {
    try {
      await dockerService.connectNetwork(this.$route.params.endpointId, networkId, this.$route.params.id);
      this.container = await dockerService.getContainerById(this.$route.params.endpointId, this.$route.params.id);
      return this.$toast.success(this.t('networks.connected'));
    } catch (err) {
      if (err instanceof AxiosError) {
        await this.$toast.error(err.response?.data.message ?? 'An error occurred');
      }
    }
  }

  async disconnectNetwork (networkId: string) {
    try {
      await dockerService.disconnectNetwork(this.$route.params.endpointId, networkId, this.$route.params.id);
      this.container = await dockerService.getContainerById(this.$route.params.endpointId, this.$route.params.id);
      return this.$toast.success(this.t('networks.disconnected'));
    } catch (err) {
      if (err instanceof AxiosError) {
        await this.$toast.error(err.response?.data.message ?? 'An error occurred');
      }
    }
  }
}
</script>
