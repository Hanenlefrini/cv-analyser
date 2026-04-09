terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = "dd3d4d5d-1b8a-4602-8bf6-e8e0a34b0209
}

resource "azurerm_resource_group" "iv-rg" {
  name     = "iv-rg"
  location = "Norway East"
  tags = {
    environment = "dev"
  }
}

# Virtual Network
resource "azurerm_virtual_network" "iv-vnet" {
  name                = "iv-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.iv-rg.location
  resource_group_name = azurerm_resource_group.iv-rg.name
}

# Subnet
resource "azurerm_subnet" "iv-subnet" {
  name                 = "iv-subnet"
  resource_group_name  = azurerm_resource_group.iv-rg.name
  virtual_network_name = azurerm_virtual_network.iv-vnet.name
  address_prefixes     = ["10.0.1.0/24"]
}

# Public IP 
resource "azurerm_public_ip" "iv-pip" {
  name                = "iv-pip"
  location            = azurerm_resource_group.iv-rg.location
  resource_group_name = azurerm_resource_group.iv-rg.name
  allocation_method   = "Static"
  sku                 = "Standard"
}

# Network Security Group and rule
resource "azurerm_network_security_group" "iv-nsg" {
  name                = "iv-nsg"
  location            = azurerm_resource_group.iv-rg.location
  resource_group_name = azurerm_resource_group.iv-rg.name

  security_rule {
    name                       = "SSH"
    priority                   = 1001
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  security_rule {
    name                       = "HTTP"
    priority                   = 1002
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "80"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  security_rule {
    name                       = "API"
    priority                   = 1003
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "5000"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  security_rule {
    name                       = "Grafana"
    priority                   = 1004
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "3000"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  security_rule {
    name                       = "Prometheus"
    priority                   = 1005
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "9090"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}

# Network Interface
resource "azurerm_network_interface" "iv-nic" {
  name                = "iv-nic"
  location            = azurerm_resource_group.iv-rg.location
  resource_group_name = azurerm_resource_group.iv-rg.name

  ip_configuration {
    name                          = "iv-nic-configuration"
    subnet_id                     = azurerm_subnet.iv-subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.iv-pip.id
  }
}

# Connect the security group to the network interface
resource "azurerm_network_interface_security_group_association" "iv-nic-nsg" {
  network_interface_id      = azurerm_network_interface.iv-nic.id
  network_security_group_id = azurerm_network_security_group.iv-nsg.id
}

# Virtual Machine
resource "azurerm_linux_virtual_machine" "iv-vm" {
  name                = "iv-vm"
  resource_group_name = azurerm_resource_group.iv-rg.name
  location            = azurerm_resource_group.iv-rg.location
  size                = "Standard_D2s_v3"
  admin_username      = "adminuser"
  network_interface_ids = [
    azurerm_network_interface.iv-nic.id,
  ]

  # Using password auth strictly for ease of dev testing right now, per our discussion
  admin_password                  = "Password_123"
  disable_password_authentication = false

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts"
    version   = "latest"
  }
}

output "public_ip_address" {
  value = azurerm_public_ip.iv-pip.ip_address
}

# Read local `.env` files dynamically
data "local_file" "backend_env" {
  filename = "${path.module}/../backend/.env"
}

data "local_file" "frontend_env" {
  filename = "${path.module}/../frontend/.env"
}

# Create a production backend `.env` file injected with the VM IP
resource "local_file" "backend_env_production" {
  content  = replace(replace(data.local_file.backend_env.content, "localhost", azurerm_public_ip.iv-pip.ip_address), "development", "production")
  filename = "${path.module}/../backend/.env.production"
}

# Create a production frontend `.env` file injected with the VM IP
resource "local_file" "frontend_env_production" {
  content  = replace(data.local_file.frontend_env.content, "localhost", azurerm_public_ip.iv-pip.ip_address)
  filename = "${path.module}/../frontend/.env.production"
}

# (Optional Bonus) Automatically configure your Ansible Inventory file too! 
resource "local_file" "ansible_inventory" {
  content  = <<EOF
[cv_analyzer]
cv-analyzer-vm ansible_host=${azurerm_public_ip.iv-pip.ip_address} ansible_user=adminuser ansible_password=Password_123 ansible_ssh_common_args='-o StrictHostKeyChecking=no'
EOF
  filename = "${path.module}/../ansible/inventory.ini"
}
